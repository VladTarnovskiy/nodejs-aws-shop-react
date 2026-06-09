import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { authHeaders } from "~/utils/authHeaders";
import { isAuthenticated } from "~/utils/authStorage";

export function useCart() {
  return useQuery<CartItem[], AxiosError>(
    "cart",
    async () => {
      const res = await axios.get<CartItem[]>(
        `${API_PATHS.cart}/api/profile/cart`,
        { headers: authHeaders() }
      );
      return res.data;
    },
    { enabled: isAuthenticated() }
  );
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    [queryClient]
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItem) =>
    axios.put<CartItem[]>(
      `${API_PATHS.cart}/api/profile/cart`,
      values,
      { headers: authHeaders() }
    )
  );
}

export function useClearCart() {
  return useMutation(() =>
    axios.delete(`${API_PATHS.cart}/api/profile/cart`, {
      headers: authHeaders(),
    })
  );
}
