import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

/**
 * Sliding-window rate limit backed by Firestore so it works consistently across
 * serverless function instances (an in-memory counter would reset per cold start
 * and wouldn't be shared across concurrent instances).
 */
export async function checkRateLimit(identifier: string, bucket: string): Promise<RateLimitResult> {
  const db = getAdminDb();
  const key = crypto.createHash("sha256").update(`${bucket}:${identifier}`).digest("hex");
  const ref = db.collection("rateLimits").doc(key);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const now = Date.now();

    if (!snap.exists) {
      tx.set(ref, { count: 1, windowStart: now, updatedAt: FieldValue.serverTimestamp() });
      return { allowed: true };
    }

    const data = snap.data() as { count: number; windowStart: number };
    const elapsed = now - data.windowStart;

    if (elapsed > WINDOW_MS) {
      tx.set(ref, { count: 1, windowStart: now, updatedAt: FieldValue.serverTimestamp() });
      return { allowed: true };
    }

    if (data.count >= MAX_REQUESTS) {
      return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - elapsed) / 1000) };
    }

    tx.update(ref, { count: FieldValue.increment(1), updatedAt: FieldValue.serverTimestamp() });
    return { allowed: true };
  });
}

/** Minimal shape both Request.headers and next/headers' headers() satisfy. */
interface HeadersLike {
  get(name: string): string | null;
}

/**
 * Best-effort client IP extraction behind common proxy/CDN setups (Vercel
 * included). Accepts a plain Headers-like object rather than a full Request
 * so it works from both API routes (request.headers) and Server Actions,
 * which only have next/headers' headers() to work with — there's no Request
 * object inside a "use server" function.
 */
export function getClientIp(headers: HeadersLike): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
