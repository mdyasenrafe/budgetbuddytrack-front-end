import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserDataType;
}

const initialState: AuthState = {
  user: {
    name: "",
    email: "",
    password: "",
  },
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
