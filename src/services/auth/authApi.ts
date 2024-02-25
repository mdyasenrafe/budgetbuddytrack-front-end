import { setToken, setUser } from "../../features/auth/authSlice";
import { saveToken } from "../../utils/storage";
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
          dispatch(setToken(data.token));
          await saveToken(data?.token);
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
          dispatch(setToken(data.token));
          await saveToken(data?.token);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    getInfoFromToken: builder.query({
      query: () => {
        return "auth/user-info";
      },
    }),
    changePassword: builder.mutation({
      query: (credential) => ({
        url: "auth/change-password",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetInfoFromTokenQuery,
  useChangePasswordMutation,
} = authApi;
