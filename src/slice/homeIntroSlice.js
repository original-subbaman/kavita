import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showIntro: true,
};

const homeIntroSlice = createSlice({
  name: "homeIntro",
  initialState,
  reducers: {
    setShowIntro: (state, action) => {
      state.showIntro = action.payload;
    },
  },
});

export const { setShowIntro } = homeIntroSlice.actions;
export default homeIntroSlice.reducer;
