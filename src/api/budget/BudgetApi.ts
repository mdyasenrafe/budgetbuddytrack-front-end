import { addNewBudget, refreshBudgets } from "../../slices/budget/budgetSlice";
import {
  CreateBudgetBodyType,
  CreateBudgetResponseType,
  GetBudgetByIdResponseType,
} from "../../utils/types/BudgetType";
import { api } from "../api";

const budgetService = api.injectEndpoints({
  endpoints: (builder) => ({
    createBudget: builder.mutation<
      CreateBudgetResponseType,
      CreateBudgetBodyType
    >({
      query: (credentials) => ({
        url: "budget/create-budget",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addNewBudget(data));
        } catch (error) {}
      },
    }),
    getBudgetById: builder.query<GetBudgetByIdResponseType, { userId: string }>(
      {
        query: ({ userId }) => `budget/get-budget/${userId}`,
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(refreshBudgets(data.data));
          } catch (error) {}
        },
      }
    ),
  }),
});

export const { useCreateBudgetMutation, useGetBudgetByIdQuery } = budgetService;
