/** Cart Service — Elastic Beanstalk */
export const CART_API_BASE_URL =
  "http://VladTarnovskiy-cart-api-develop.eu-west-1.elasticbeanstalk.com";

/** BFF Service — Elastic Beanstalk (products go through BFF) */
export const BFF_API_BASE_URL =
  "http://VladTarnovskiy-bff-api-prod.eu-west-1.elasticbeanstalk.com";

/** Import Service — API Gateway (not deployed to EB) */
export const API_BASE_URL_IMPORT =
  "https://piuxoe8nk0.execute-api.eu-west-1.amazonaws.com/prod";

const API_PATHS = {
  bff: BFF_API_BASE_URL,
  cart: CART_API_BASE_URL,
  order: CART_API_BASE_URL,
  import: API_BASE_URL_IMPORT,
};

export default API_PATHS;
