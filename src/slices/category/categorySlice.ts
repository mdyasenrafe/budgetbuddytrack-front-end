import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryItem, CategoryState } from "../../utils/types/categoryType";

const initialState: CategoryState = {
  incomeCategories: null,
  expenseCategories: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateIncomeCategories: (
      state,
      action: PayloadAction<CategoryItem[] | null>
    ) => {
      state.incomeCategories = action.payload;
    },
    updateExpenseCategories: (
      state,
      action: PayloadAction<CategoryItem[] | null>
    ) => {
      state.expenseCategories = action.payload;
    },
  },
});

export const { updateIncomeCategories, updateExpenseCategories } =
  categorySlice.actions;

export default categorySlice.reducer;
