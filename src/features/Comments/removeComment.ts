import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeComment = createAsyncThunk(
  "comments/remove",
  async (comment) => {
    const response = await fetch(
      `http://localhost:4000/comments/${comment.id}`,
      {
        method: "DELETE",
      },
    );
    return comment;
  },
);
