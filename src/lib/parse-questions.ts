import { Topic } from "./types";

function inferTopic(question: string, topics: Topic[]) {
  const text = question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")

  let bestMatch = { topicId: null as string | null, score: 0 }

  for (const topic of topics) {
    let score = 0

    for (const keyword of topic.keywords) {
      const words = keyword.toLowerCase().split(" ")

      for (const word of words) {
        if (text.includes(word)) score++
      }
    }

    if (score > bestMatch.score) {
      bestMatch = {
        topicId: topic._id!,
        score,
      }
    }
  }

  return bestMatch.score > 0 ? bestMatch.topicId : null
}

export function parseQuestions(text: string, topics: Topic[]) {
  const regex = /Q\d+\.\s*(.*?)\s*\((\d+)\)/g
  const matches = [...text.matchAll(regex)]

  return matches.map(match => {
    const text = match[1].trim()
    const topicId = inferTopic(text, topics)

    return {
      text,
      marks: Number(match[2]),
      topicId,
    }
  })
}
