import { createAsyncThunk } from "@reduxjs/toolkit";

export const addComment = createAsyncThunk("comments/add", async (data) => {
  const response = await fetch("http://localhost:4000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
});
