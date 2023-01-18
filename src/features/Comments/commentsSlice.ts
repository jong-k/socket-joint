import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "./fetchComments";
import { addComment } from "./addComment";
import { removeComment } from "./removeComment";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    // 전체 댓글 로딩
    builder.addCase(fetchComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // 새 댓글 생성
    builder.addCase(addComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // 댓글 삭제
    builder.addCase(removeComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(removeComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
