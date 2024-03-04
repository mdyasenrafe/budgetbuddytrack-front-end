import { api } from "../api";

const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: (credentials) => ({
        url: "transaction/add-expense",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const { useAddExpenseMutation } = transactionApi;
