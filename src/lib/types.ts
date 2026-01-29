export interface course {
  name: string
  topics: string[]
}

export interface question {
  question: string
  marks: number
  topic: string
}

export interface paper {
  subject: string
  year: number
  questions: question[]
}

export interface achievement {
  name: string
  description: string
  isUnlocked: boolean
}

export interface exam {
  course: string
  dateTime: Date
}

export interface student {
  name: string
  email: string
  semester: number
  exams: Array<{
    course: string
    dateTime: string | Date
  }>
  achievements?: achievement[]
}
