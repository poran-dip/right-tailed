import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  marks: { type: Number, required: true },
  topic: { type: String, required: true },
}, { _id: false });

const PaperSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
    index: true,
  },
  year: { type: Number, required: true },

  questions: {
    type: [QuestionSchema],
    default: [],
  },
}, { timestamps: true });

PaperSchema.index({ subjectId: 1, year: 1 }, { unique: true });

export default mongoose.models.Paper || mongoose.model("Paper", PaperSchema);
