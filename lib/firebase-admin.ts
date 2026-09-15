import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Server-only Firebase Admin instance. Never import this file from a
 * "use client" component — it relies on service-account credentials
 * that must stay on the server.
 */
function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel/most hosts store multi-line PEM keys with literal "\n" escapes.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

/**
 * Sign-up is open to the public (anyone can create an account at /sign-up),
 * but that account shouldn't automatically be able to read sensitive data —
 * real people's names, emails, and messages from the contact form. This
 * checks a Firebase ID token AND cross-references the caller's email against
 * an explicit allowlist, so "logged in" and "authorized to read inquiries"
 * stay two separate things.
 *
 * Returns the verified, allowlisted email on success, or a NextResponse to
 * return immediately (401/403) on failure — callers should check which they
 * got back before proceeding.
 */
export async function requireAdmin(
  request: NextRequest
): Promise<{ email: string } | NextResponse> {
  const authHeader = request.headers.get("authorization");
  const idToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!idToken) {
    return NextResponse.json({ error: "Missing authorization token." }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  const email = decoded.email?.toLowerCase();
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!email || allowlist.length === 0 || !allowlist.includes(email)) {
    return NextResponse.json(
      { error: "You're signed in, but this account isn't authorized for admin data." },
      { status: 403 }
    );
  }

  return { email };
}
