import { setUser } from "../../features/auth/authSlice";
import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data?.data));
        } catch {}
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.data));
        } catch {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
