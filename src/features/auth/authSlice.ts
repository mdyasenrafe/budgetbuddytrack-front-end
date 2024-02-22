import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserDataType | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the user upon login
    setUser: (state, action: PayloadAction<UserDataType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
