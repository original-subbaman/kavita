import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openReportPost: false,
  openReportComment: false,
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    setOpenReportPost: (state, action) => {
      state.openReportPost = action.payload;
    },
    setOpenReportComment: (state, action) => {
      state.openReportComment = action.payload;
    },
  },
});

export const { setOpenReportPost, setOpenReportComment } =
  postDetailSlice.actions;
export default postDetailSlice.reducer;
