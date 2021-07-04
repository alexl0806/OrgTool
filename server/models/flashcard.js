import mongoose from "mongoose";

const flashcardSchema = mongoose.Schema({
  front: String,
  back: String,
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
