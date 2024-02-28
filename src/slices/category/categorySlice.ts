import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryType, IncomeType } from "../../utils/types/categoryType";

const initialState: CategoryType = {
  income: null,
  expense: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<IncomeType | null>) => {
      state.income = action.payload;
    },
    setExpense: (state, action: PayloadAction<IncomeType | null>) => {
      state.expense = action.payload;
    },
  },
});

export const { setIncome, setExpense } = categorySlice.actions;

export default categorySlice.reducer;
