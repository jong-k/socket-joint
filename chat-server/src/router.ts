import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is running").status(200);
});
