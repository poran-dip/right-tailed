# RightTailed

RightTailed is an exam-preparation platform built around **analyzing Previous Year Questions (PYQs)** to improve study efficiency.
Instead of treating PYQs as static PDFs, the system treats them as structured data that can be analyzed to extract topic importance, patterns, and actionable insights.

This repository was created during **Pandu College Hackathon (31st January)** under the EdTech problem statement.

---

## Project Motivation

Students rely heavily on PYQs for exam preparation, but existing platforms mainly act as file-sharing portals. They typically:

* provide PDFs without context
* do not indicate topic weightage or frequency
* do not help prioritize study time
* do not provide feedback loops after practice or exams

RightTailed aims to address these gaps by using PYQs to **guide preparation decisions**, not just store content.

---

## Core Idea

**PYQs are treated as data, not documents.**

Each question contributes information about:

* topic importance
* repetition patterns
* marks distribution
* exam focus areas

This information is then used to assist students in planning and evaluating their preparation.

---

## Current Scope

The platform supports:

* Uploading and browsing PYQs grouped by:

  * University / College
  * Department
  * Semester
  * Syllabus
  * Exam type (Unit Test, End Semester, Entrance, etc.)

* Automatic analysis of uploaded papers:

  * Extraction of individual questions (MCQs and descriptive)
  * Association of marks per question
  * Mapping questions to topics

* Aggregation of historical data to generate:

  * Topic-wise frequency
  * Weightage insights
  * Common and recurring patterns across exams

---

## Planned Features / Extensions

These features are planned or conceptually designed and may be implemented incrementally:

* **Personalized Preparation Plans**

  * Generated using exam type, syllabus scope, and time remaining
  * Prioritizes topics based on historical importance

* **Mock Tests**

  * Time-bound tests with mixed question types
  * Topic-level performance feedback instead of only total scores

* **Post-Exam Analysis**

  * Allows students to check:

    * which expected points they included
    * which points they missed
  * Focuses on feedback rather than rewriting full answers

The long-term goal is to reduce wasted effort and make exam preparation more data-driven.

---

## Tech Stack (subject to change)

* Frontend: React with Next.js + TailwindCSS
* Backend / Logic: Node.js + Gemini API
* Database: TBD (likely MongoDB or Postgres with Prisma)

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/poran-dip/right-tailed
cd right-tailed
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Verify the production build:

```bash
npm run build
```

Always ensure `npm run build` passes before major changes or deployments.

---

## Team

**Built By**: Pyroflies

**Members:**
* Poran Dip
* Dikshyan
* Shivayan
* Parashar
