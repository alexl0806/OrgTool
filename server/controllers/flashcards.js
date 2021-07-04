import Flashcard from "../models/flashcard.js";

export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();

    res.status(200).json(flashcards);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createFlashcard = async (req, res) => {
  const body = req.body;

  const newFlashcard = new Flashcard(body);

  try {
    await newFlashcard.save();

    res.status(200).json(newFlashcard);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
