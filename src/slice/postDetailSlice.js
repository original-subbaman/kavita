import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openReportPost: false,
  openReportComment: false,
  openDeleteComment: false,
  postId: null,
  commentId: null,
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
    setOpenDeleteComment: (state, action) => {
      state.openDeleteComment = action.payload;
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
  },
});

export const {
  setOpenReportPost,
  setOpenReportComment,
  setOpenDeleteComment,
  setPostId,
  setCommentId,
} = postDetailSlice.actions;
export default postDetailSlice.reducer;
