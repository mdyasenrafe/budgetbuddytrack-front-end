import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import { api } from "./api/api";
import categoryReducer from "./slices/category/categorySlice";
import cardSlice from "./slices/card/cardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    card: cardSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
