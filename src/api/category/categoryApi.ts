import { setExpense, setIncome } from "../../slices/category/categorySlice";
import {
  CategoryApiResponseType,
  IncomeType,
} from "../../utils/types/categoryType";
import { api } from "../api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<CategoryApiResponseType, void | undefined>({
      query: () => {
        return "category/categories";
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const income: IncomeType[] = [];
          const expense: IncomeType[] = [];
          data.data.map((item: IncomeType) => {
            if (item.type === "expense") {
              income.push(item);
            } else if (item.type === "income") {
              expense.push(item);
            }
          });
          dispatch(setIncome(income));
          dispatch(setExpense(expense));
        } catch {}
      },
    }),
  }),
});
export const { useGetCategoryQuery } = categoryApi;
