import Flashcard from "../models/flashcard.js";

export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();

    res.status(200).json(flashcards);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createFlashcard = (req, res) => {
  res.send("Flashcard Creation");
};
