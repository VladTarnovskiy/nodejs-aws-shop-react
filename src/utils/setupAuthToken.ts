import axios from "axios";
import API_PATHS from "~/constants/apiPaths";
import { authHeaders } from "~/utils/authHeaders";
import { clearAuthSession, getAuthToken } from "~/utils/authStorage";

/** Task 7.3: Basic auth token for import service and BFF admin routes. */
export function setupImportAuthToken(): void {
  const authorization_token = btoa("VladTarnovskiy:TEST_PASSWORD");
  localStorage.setItem("authorization_token", authorization_token);
}

/** Validates cart-api session on app start; clears cart session if profile request fails. */
export async function validateCartAuthSession(): Promise<void> {
  if (!getAuthToken()) {
    return;
  }

  try {
    await axios.get(`${API_PATHS.cart}/api/profile`, {
      headers: authHeaders(),
    });
  } catch {
    clearAuthSession();
  }
}
