/**
 * Resolve a stored asset URL into a browser-usable URL.
 *
 * - Absolute http(s) URLs (Unsplash, etc.) are returned as-is.
 * - Paths under `/api/` (uploaded files served by our backend) are prefixed
 *   with REACT_APP_BACKEND_URL so the frontend can be on a different host
 *   (e.g. Netlify) than the backend (e.g. Railway).
 * - Other relative paths (e.g. /logos/...) are kept relative to the frontend.
 */
const BACKEND = process.env.REACT_APP_BACKEND_URL || "";

export function asset(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/api/")) return `${BACKEND}${url}`;
  return url;
}
