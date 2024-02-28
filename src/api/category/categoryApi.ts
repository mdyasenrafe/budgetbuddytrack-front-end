import {
  updateExpenseCategories,
  updateIncomeCategories,
} from "../../slices/category/categorySlice";
import { CategoryItem, CategoryResponse } from "../../utils/types/categoryType";
import { api } from "../api";

export const categoryService = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query<CategoryResponse, void | undefined>({
      query: () => {
        return "category/categories";
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const incomeCategories: CategoryItem[] = [];
          const expenseCategories: CategoryItem[] = [];
          data.data.forEach((item: CategoryItem) => {
            if (item.type === "expense") {
              expenseCategories.push(item);
            } else if (item.type === "income") {
              incomeCategories.push(item);
            }
          });
          dispatch(updateIncomeCategories(incomeCategories));
          dispatch(updateExpenseCategories(expenseCategories));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoryService;
