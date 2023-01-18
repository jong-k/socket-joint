import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOneComment = createAsyncThunk(
  "comments/fetchOne",
  async (comment) => {
    const response = await fetch(
      `http://localhost:4000/comments/${comment.id}`,
    );
    return await response.json();
  },
);
