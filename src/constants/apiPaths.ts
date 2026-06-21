export const API_BASE_URL =
  "https://vonbt21szf.execute-api.eu-west-1.amazonaws.com/prod";

export const API_BASE_URL_IMPORT =
  "https://piuxoe8nk0.execute-api.eu-west-1.amazonaws.com/prod";

export const CART_API_BASE_URL =
  "http://VladTarnovskiy-cart-api-develop.eu-west-1.elasticbeanstalk.com";

const API_PATHS = {
  product: API_BASE_URL,
  order: CART_API_BASE_URL,
  import: API_BASE_URL_IMPORT,
  bff: API_BASE_URL,
  cart: CART_API_BASE_URL,
};

export default API_PATHS;
