/** Task 7.3: Basic auth token for protected API routes (import, admin products, etc.). */
export function setupAuthToken(): void {
  const authorization_token = btoa("VladTarnovskiy:TEST_PASSWORD");
  localStorage.setItem("authorization_token", authorization_token);
}
