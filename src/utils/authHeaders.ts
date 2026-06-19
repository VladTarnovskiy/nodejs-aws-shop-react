import { getAuthToken } from "~/utils/authStorage";

/** Authorization header for cart-api (login, cart, orders). */
export function authHeaders():
  | { Authorization: string }
  | Record<string, never> {
  const token = getAuthToken();
  return token ? { Authorization: `Basic ${token}` } : {};
}
