import { createAsyncThunk } from "@reduxjs/toolkit";

export const editComment = createAsyncThunk(
  "comments/edit",
  async (comment, newData) => {
    const response = await fetch(
      `http://localhost:4000/comments/${comment.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newData),
      },
    );
    return await response.json();
  },
);
