/**
 * Races a promise against a timeout, so a hanging external call fails fast
 * with a normal, catchable Error instead of letting the serverless platform's
 * own function timeout kill the request first.
 *
 * This matters specifically for the Firebase Admin SDK: with malformed (not
 * just missing) credentials, auth can hang retrying rather than throwing
 * immediately. If that hang wins the race against Vercel's own timeout, the
 * platform returns its own raw HTML error page — which isn't JSON, which is
 * why a client catch like `body?.error ?? "generic fallback"` ends up
 * showing the generic fallback instead of a specific message: the response
 * body was never JSON in the first place, `response.json()` throws, and the
 * `.catch(() => null)` around it swallows exactly what actually went wrong.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
}
