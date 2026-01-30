import mongoose, { ObjectId } from "mongoose"

export interface IStudent extends mongoose.Document {
  name: string
  email: string
  passwordHash: string
  departmentId: ObjectId
  semester: number
  currentSubjects: ObjectId[]
  uploadedPapers: ObjectId[]
  savedPapers: ObjectId[]
  upcomingExams: IExam[]
  createdAt: Date
}

export interface ISubject extends mongoose.Document {
  name: string
  departmentId: ObjectId
  semester: number
  topics: ITopic[]
}

export interface ITopic {
  _id?: ObjectId
  name: string
  keywords: string[]
}

export interface IPaper extends mongoose.Document {
  subjectId: ObjectId
  year: number
  questions: IQuestion[]
  uploadedBy: ObjectId
  createdAt: Date
}

export interface IQuestion {
  _id?: ObjectId
  text: string
  marks: number
  topicId: ObjectId
}

export interface IExam {
  subjectId: ObjectId
  dateTime: Date
}

export interface IDepartment extends mongoose.Document {
  code: string
  name: string
}
