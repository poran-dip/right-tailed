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
