import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardState, CardDetails } from "../../utils/types/CardOverviewType";

const initialState: CardState = {
  details: null,
  isLoading: true,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardDetails: (state, action: PayloadAction<CardDetails>) => {
      state.details = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCardDetails } = cardSlice.actions;

export default cardSlice.reducer;
