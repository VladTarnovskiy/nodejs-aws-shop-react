import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { Address, Order } from "~/models/Order";
import { authHeaders } from "~/utils/authHeaders";
import { isAuthenticated } from "~/utils/authStorage";

export type CheckoutResponse = {
  order: Order;
};

export function useOrders() {
  return useQuery<Order[], AxiosError>(
    "orders",
    async () => {
      const res = await axios.get<Order[]>(
        `${API_PATHS.order}/api/profile/cart/order`,
        { headers: authHeaders() }
      );
      return res.data;
    },
    { enabled: isAuthenticated(), staleTime: 0 }
  );
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("orders", { exact: true }),
    [queryClient]
  );
}

export function useSubmitOrder() {
  return useMutation((values: { address: Address }) =>
    axios.put<CheckoutResponse>(
      `${API_PATHS.order}/api/profile/cart/order`,
      values,
      { headers: authHeaders() }
    )
  );
}

/** Not supported by cart-api — kept for compatibility; will fail at runtime. */
export function useUpdateOrderStatus() {
  return useMutation(() =>
    Promise.reject(new Error("Order status updates are not supported by cart API"))
  );
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) =>
      queryClient.invalidateQueries(["order", { id }], { exact: true }),
    [queryClient]
  );
}

/** Not supported by cart-api — kept for compatibility; will fail at runtime. */
export function useDeleteOrder() {
  return useMutation(() =>
    Promise.reject(new Error("Order deletion is not supported by cart API"))
  );
}
