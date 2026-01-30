import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  topics: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
