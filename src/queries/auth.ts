import axios, { AxiosError } from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { authHeaders } from "~/utils/authHeaders";
import {
  clearAuthSession,
  getAuthToken,
  isAuthenticated,
  saveAuthSession,
} from "~/utils/authStorage";

export type RegisterPayload = {
  name: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token_type: string;
  access_token: string;
};

export type ProfileUser = {
  id: string;
  name: string;
};

export type ProfileResponse = {
  user: ProfileUser;
};

export function useProfile() {
  return useQuery<ProfileResponse, AxiosError>(
    "profile",
    async () => {
      const res = await axios.get<ProfileResponse>(
        `${API_PATHS.cart}/api/profile`,
        { headers: authHeaders() }
      );
      return res.data;
    },
    { enabled: isAuthenticated(), retry: false }
  );
}

export function useRegister() {
  return useMutation((values: RegisterPayload) =>
    axios.post<{ userId: string }>(
      `${API_PATHS.cart}/api/auth/register`,
      values
    )
  );
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(
    (values: LoginPayload) =>
      axios.post<LoginResponse>(`${API_PATHS.cart}/api/auth/login`, values),
    {
      onSuccess: (response, variables) => {
        saveAuthSession({
          accessToken: response.data.access_token,
          tokenType: response.data.token_type,
          userName: variables.username,
        });
        queryClient.invalidateQueries("profile");
        queryClient.invalidateQueries("cart");
      },
    }
  );
}

export function useLogout() {
  const queryClient = useQueryClient();
  return React.useCallback(() => {
    clearAuthSession();
    queryClient.removeQueries("profile");
    queryClient.removeQueries("cart");
    queryClient.removeQueries("orders");
  }, [queryClient]);
}

export { getAuthToken, isAuthenticated };
