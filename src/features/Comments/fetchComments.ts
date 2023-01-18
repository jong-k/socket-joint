import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk("comments/fetch", async () => {
  const response = await fetch("http://localhost:4000/comments");
  return await response.json();
});
