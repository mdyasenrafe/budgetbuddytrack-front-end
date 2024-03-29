import {
  appendBudget,
  updateBudgetList,
} from "../../slices/budget/budgetSlice";
import {
  BudgetCreationRequest,
  BudgetCreationResponse,
  BudgetDetailsResponse,
} from "../../utils/types/BudgetType";
import { api } from "../api";

const budgetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBudget: builder.mutation<
      BudgetCreationResponse,
      BudgetCreationRequest
    >({
      query: (budgetData) => ({
        url: "budget/create-budget",
        method: "POST",
        body: budgetData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(appendBudget(data));
        } catch (error) {}
      },
    }),
    fetchBudgetById: builder.query<BudgetDetailsResponse, { userId: string }>({
      query: ({ userId }) => `budget/get-budget/${userId}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateBudgetList(data.data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useCreateBudgetMutation, useFetchBudgetByIdQuery } = budgetApi;
