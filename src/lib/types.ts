export interface Student {
  _id: string
  name: string
  email: string
  departmentId: string
  semester: number
  currentSubjects: string[]
  uploadedPapers: string[]
  savedPapers: string[]
  upcomingExams: Exam[]
  createdAt: string
  updatedAt: string
}

export interface Subject {
  _id: string
  name: string
  departmentId: string
  topics: Topic[]
}

export interface Topic {
  _id?: string
  name: string
  keywords: string[]
}

export interface Paper {
  _id: string
  subjectId: string
  year: number
  questions: Question[]
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export interface Question {
  _id?: string
  text: string
  marks: number
  topicId: string
}

export interface Exam {
  subjectId: string
  dateTime: string
}

export interface Department {
  _id: string
  code: string
  name: string
}

export interface StudentPopulated extends Omit<Student, 'departmentId' | 'currentSubjects'> {
  departmentId: Department
  currentSubjects: Subject[]
}

export interface PaperPopulated extends Omit<Paper, 'subjectId' | 'uploadedBy'> {
  subjectId: Subject
  uploadedBy: Student
}
