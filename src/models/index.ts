import { ITopic, IQuestion, IExam, IStudent, ISubject, IPaper, IDepartment } from '@/lib/db.types'
import mongoose, { Schema, Model, models } from 'mongoose'

const TopicSchema = new Schema<ITopic>({
  name: { type: String, required: true },
  keywords: { type: [String], default: [] }
})

const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  marks: { type: Number, required: true },
  topicId: { type: Schema.Types.ObjectId, required: true }
})

const ExamSchema = new Schema<IExam>({
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  dateTime: { type: Date, required: true }
})

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    currentSubjects: [{ type: Schema.Types.ObjectId, ref: 'Subject', default: [] }],
    uploadedPapers: [{ type: Schema.Types.ObjectId, ref: 'Paper', default: [] }],
    savedPapers: [{ type: Schema.Types.ObjectId, ref: 'Paper', default: [] }],
    upcomingExams: { type: [ExamSchema], default: [] }
  },
  { timestamps: true }
)

const SubjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  topics: { type: [TopicSchema], default: [] }
})

const PaperSchema = new Schema<IPaper>(
  {
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    year: { type: Number, required: true },
    questions: { type: [QuestionSchema], default: [] },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
  },
  { timestamps: true }
)

const DepartmentSchema = new Schema<IDepartment>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true }
})

StudentSchema.index({ departmentId: 1 })
SubjectSchema.index({ departmentId: 1, semester: 1 })
PaperSchema.index({ subjectId: 1, year: 1 })
PaperSchema.index({ uploadedBy: 1 })

export const Student: Model<IStudent> = 
  models.Student || mongoose.model<IStudent>('Student', StudentSchema)

export const Subject: Model<ISubject> = 
  models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema)

export const Paper: Model<IPaper> = 
  models.Paper || mongoose.model<IPaper>('Paper', PaperSchema)

export const Department: Model<IDepartment> = 
  models.Department || mongoose.model<IDepartment>('Department', DepartmentSchema)
