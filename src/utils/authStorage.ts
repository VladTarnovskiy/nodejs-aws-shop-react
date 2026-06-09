const CART_AUTH_TOKEN_KEY = "cart_authorization_token";
const CART_TOKEN_TYPE_KEY = "cart_token_type";
const CART_USER_NAME_KEY = "cart_user_name";

export function getAuthToken(): string | null {
  return localStorage.getItem(CART_AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function saveAuthSession(params: {
  accessToken: string;
  tokenType?: string;
  userName?: string;
}): void {
  localStorage.setItem(CART_AUTH_TOKEN_KEY, params.accessToken);
  if (params.tokenType) {
    localStorage.setItem(CART_TOKEN_TYPE_KEY, params.tokenType);
  }
  if (params.userName) {
    localStorage.setItem(CART_USER_NAME_KEY, params.userName);
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(CART_AUTH_TOKEN_KEY);
  localStorage.removeItem(CART_TOKEN_TYPE_KEY);
  localStorage.removeItem(CART_USER_NAME_KEY);
}

export function getUserName(): string | null {
  return localStorage.getItem(CART_USER_NAME_KEY);
}
