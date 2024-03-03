import { PayloadAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { CardState, CardType } from "../../utils/types/CardOverviewType";

const initialState: CardState = {
  data: null,
  isLoading: true,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardData: (state, action: PayloadAction<CardType>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});
export const { setCardData } = cardSlice.actions;

export default cardSlice.reducer;
