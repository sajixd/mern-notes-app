// server/models/Note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Enforce ownership
  }
}, { timestamps: true });

// Check if model exists before compiling
const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
