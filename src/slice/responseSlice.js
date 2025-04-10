// features/response/responseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  error: false,
  message: "",
};

const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = true;
      state.error = false;
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.success = false;
      state.error = true;
      state.message = action.payload;
    },
    resetResponse: () => initialState,
  },
});

// Export actions
export const { setSuccess, setError, resetResponse } = responseSlice.actions;

// Export reducer
export default responseSlice.reducer;
