import { rest } from "msw";
import API_PATHS from "~/constants/apiPaths";
import { availableProducts, orders, cart } from "~/mocks/data";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct } from "~/models/Product";

const mockUsers = new Map<string, string>();

function parseBasicAuth(
  authHeader: string | null
): { username: string; password: string } | null {
  if (!authHeader?.startsWith("Basic ")) {
    return null;
  }
  try {
    const decoded = atob(authHeader.slice(6));
    const separator = decoded.indexOf(":");
    if (separator === -1) {
      return null;
    }
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

function isAuthorized(req: { headers: { get(name: string): string | null } }) {
  const credentials = parseBasicAuth(req.headers.get("Authorization"));
  if (!credentials) {
    return false;
  }
  return mockUsers.get(credentials.username) === credentials.password;
}

export const handlers = [
  rest.get(`${API_PATHS.bff}/products`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json<AvailableProduct[]>(availableProducts)
    );
  }),
  rest.post(`${API_PATHS.bff}/products`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put(`${API_PATHS.bff}/products/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${API_PATHS.bff}/products/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${API_PATHS.bff}/products/:id`, (req, res, ctx) => {
    const product = availableProducts.find((p) => p.id === req.params.id);
    if (!product) {
      return res(ctx.status(404));
    }
    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json<AvailableProduct>(product)
    );
  }),
  rest.post(`${API_PATHS.cart}/api/auth/register`, async (req, res, ctx) => {
    const body = await req.json<{ name: string; password: string }>();
    if (mockUsers.has(body.name)) {
      return res(
        ctx.status(400),
        ctx.json({ message: "User with such name already exists" })
      );
    }
    mockUsers.set(body.name, body.password);
    return res(ctx.status(201), ctx.json({ userId: crypto.randomUUID() }));
  }),
  rest.post(`${API_PATHS.cart}/api/auth/login`, async (req, res, ctx) => {
    const body = await req.json<{ username: string; password: string }>();
    if (mockUsers.get(body.username) !== body.password) {
      return res(ctx.status(401), ctx.json({ message: "Invalid credentials" }));
    }
    return res(
      ctx.status(200),
      ctx.json({
        token_type: "Basic",
        access_token: btoa(`${body.username}:${body.password}`),
      })
    );
  }),
  rest.get(`${API_PATHS.cart}/api/profile`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401));
    }
    const credentials = parseBasicAuth(req.headers.get("Authorization"))!;
    return res(
      ctx.status(200),
      ctx.json({
        user: { id: "mock-user-id", name: credentials.username },
      })
    );
  }),
  rest.get(`${API_PATHS.cart}/api/profile/cart`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401));
    }
    return res(ctx.status(200), ctx.delay(), ctx.json<CartItem[]>(cart));
  }),
  rest.put(`${API_PATHS.cart}/api/profile/cart`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401));
    }
    return res(ctx.status(200));
  }),
  rest.delete(`${API_PATHS.cart}/api/profile/cart`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401));
    }
    return res(ctx.status(200));
  }),
  rest.get(`${API_PATHS.cart}/api/profile/cart/order`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401));
    }
    return res(ctx.status(200), ctx.delay(), ctx.json<Order[]>(orders));
  }),
  rest.put(`${API_PATHS.cart}/api/profile/cart/order`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401));
    }
    return res(ctx.status(200));
  }),
];
