import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import flashcardRoutes from "./routes/flashcards.js";
import todoRoutes from "./routes/todo.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/flashcards", flashcardRoutes);
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
