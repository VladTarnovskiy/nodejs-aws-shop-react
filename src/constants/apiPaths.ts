export const API_BASE_URL =
  "https://ofws1j1da8.execute-api.us-east-1.amazonaws.com/prod";

export const API_BASE_URL_IMPORT =
  "https://73dkib974l.execute-api.us-east-1.amazonaws.com/prod";

export const CART_API_BASE_URL =
  "https://1cbmqpp2zh.execute-api.us-east-1.amazonaws.com";

const API_PATHS = {
  product: API_BASE_URL,
  order: CART_API_BASE_URL,
  import: API_BASE_URL_IMPORT,
  bff: API_BASE_URL,
  cart: CART_API_BASE_URL,
};

export default API_PATHS;
