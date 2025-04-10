import { configureStore } from "@reduxjs/toolkit";
import postDetailReducer from "./slice/postDetailSlice";
import responseReducer from "./slice/responseSlice";

export const store = configureStore({
  reducer: {
    postDetail: postDetailReducer,
    response: responseReducer,
  },
});
