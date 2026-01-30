import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { extractText, getDocumentProxy } from "unpdf";
import { parseQuestions } from "@/lib/parse-questions";
import { Subject } from "@/models";
import { Topic } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const subjectId = formData.get("subjectId") as string

    const subject = await Subject.findById(subjectId)

    if (!subject) {
      return NextResponse.json({ error: "Invalid subject" }, { status: 400 })
    }

    const inferenceTopics: Topic[] = subject.topics.map(t => ({
      _id: t._id?.toString(),
      name: t.name,
      keywords: t.keywords,
    }))

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const pdf = await getDocumentProxy(new Uint8Array(buffer));

    // extract text
    const { text } = await extractText(pdf, { mergePages: true });

    // --- write raw text to disk BEFORE parsing ---
    const rawTextPath = path.join(process.cwd(), "extracted_raw_text.txt");
    fs.writeFileSync(rawTextPath, text, "utf-8");
    console.log(`Raw PDF text written to ${rawTextPath}`);
    // ---------------------------------------------

    // now parse the questions
    const questions = parseQuestions(text, inferenceTopics)

    return NextResponse.json({ questions });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to extract text from PDF" },
      { status: 500 }
    );
  }
}
