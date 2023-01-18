import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "./fetchComments";
import { addComments } from "./addComments";

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
    builder.addCase(addComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
