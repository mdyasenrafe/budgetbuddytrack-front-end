import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BudgetState,
  CreateBudgetResponseType,
} from "../../utils/types/BudgetType";

const initialState: BudgetState = {
  budgets: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    refreshBudgets: (
      state,
      action: PayloadAction<CreateBudgetResponseType[]>
    ) => {
      state.budgets = action.payload;
    },
    addNewBudget: (state, action: PayloadAction<CreateBudgetResponseType>) => {
      state.budgets.push(action.payload);
    },
  },
});

export const { refreshBudgets, addNewBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
