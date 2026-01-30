import mongoose from "mongoose";

export const ExamSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  dateTime: { type: Date, required: true },
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, select: false },

  semester: { type: Number, min: 1 },
  program: { type: String, trim: true },

  subjectIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  }],

  paperIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paper",
  }],

  exams: {
    type: [ExamSchema],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
