import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "../services/api";
import ModalReducer from "../features/modal";

export const store = configureStore({
  reducer: {
    modal: ModalReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
