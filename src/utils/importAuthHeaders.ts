const IMPORT_AUTH_TOKEN_KEY = "authorization_token";

/** Authorization header for import service and BFF admin product APIs. */
export function importAuthHeaders():
  | { Authorization: string }
  | Record<string, never> {
  const token = localStorage.getItem(IMPORT_AUTH_TOKEN_KEY);
  return token ? { Authorization: `Basic ${token}` } : {};
}
