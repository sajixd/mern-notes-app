import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// GET all notes (filtered by user)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// CREATE note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = new Note({
      title,
      content,
      userId: req.userId
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Error creating note" });
  }
});

// GET one note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note" });
  }
});

// UPDATE note
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

export default router;
