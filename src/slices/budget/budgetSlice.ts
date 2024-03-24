import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BudgetCreationResponse,
  BudgetState,
} from "../../utils/types/BudgetType";

const initialState: BudgetState = {
  budgetList: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    updateBudgetList: (
      state,
      action: PayloadAction<BudgetCreationResponse[]>
    ) => {
      state.budgetList = action.payload;
    },
    appendBudget: (state, action: PayloadAction<BudgetCreationResponse>) => {
      state.budgetList.push(action.payload);
    },
  },
});

export const { updateBudgetList, appendBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
