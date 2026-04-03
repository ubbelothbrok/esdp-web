// Central config — change this in one place when deploying
export const BACKEND_URL = "http://127.0.0.1:8000";

/**
 * Given an image path returned by the Django API (e.g. "/media/programs/foo.jpg"),
 * returns the full absolute URL. Returns an empty string if no image.
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  // Already an absolute URL (shouldn't happen, but guard anyway)
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path}`;
}
