# K–12 Learning Management System — Prototype

## Overview

This project is a **high-impact prototype** of a Learning Management System (LMS) designed for **middle school (Grades 6–8)** education (but could be easily adapted for any other level)

Rather than attempting to build a full LMS, this prototype focuses on **two core user experiences** that matter most in real classrooms:

- Helping **students** understand what they should work on next and what they got wrong  
- Helping **teachers** review student thinking efficiently while staying in control of feedback  

With such a short deadline, I decided to focus on a few important features rather than making a fully functional production-ready LMS. 

---

## Design Principles

### 1. Teacher Authority First
AI is used to **support**, not replace, teachers.

- AI suggestions are always labeled as suggestions  
- Teachers can edit, remove, or publish all feedback  
- Students only see **teacher-approved** feedback  

No generated content is immediately sent to the students

---

### 2. Minimize Teacher Workload
Teachers are time-constrained. The UI is designed to surface **only what requires attention**.

- Auto-graded multiple-choice questions are visible with correctness
- Teacher feedback is focused on short-answer and incorrect multiple-choice responses where guidance is important 
- Correct answers and summaries are provided for transparency, not extra work  

---

### 3. Calm, Focused Student Experience
Students see:
- What’s assigned  
- What they need to do next  
- Whether feedback is pending or published  

---

## Core User Flows

### Student Flow
1. Log in as a student (no authentication for prototype)  
2. View dashboard with assigned subject sections  
3. Start a diagnostic quiz from a prominent assignment card  
4. Complete a multi-page quiz  
5. Return to the dashboard showing **“Waiting for teacher feedback”**  
6. After publishing, view teacher-approved feedback and next steps  

---

### Teacher Flow
1. Log in as a teacher  
2. Select a class from a dropdown (mocked)  
3. View a list of students in different states:  
   - Not started  
   - Submitted (needs review)  
   - Published  
4. Review only completed student work  
5. See:  
   - Short-answer responses requiring feedback  
   - Incorrect multiple-choice questions for context  
   - Correct multiple-choice answers for transparency  
6. Edit or remove AI-generated suggestions  
7. Publish or unpublish feedback to students  

Currently, student quiz data is stored in local storage, so it cannot be accessed across computers
---

## AI Integration 


AI functions to 
- Draft per-question feedback for short-answer responses  
- Suggest an overall quiz summary  
- Recommend the next instructional focus  

### Guardrails
- All AI content is clearly labeled  
- No AI output reaches students without teacher approval  
- Teachers can edit or remove any suggestion with minimal friction  


---

## Technical Scope & Tradeoffs

This prototype intentionally avoids production-level complexity.

### Included
- Next.js + Tailwind frontend  
- Clean component structure  
- Reusable card system  
- Clear state modeling  
- Mock data with realistic workflows
- AI integration with Gemini API

### Mocked / Simplified
- Authentication  
- Database persistence  
- Notifications  

These were scoped out to prioritize **clarity, finish quality, and decision-making**.

---

## What I Would Build Next

With more time, the next logical steps would be: 
- Persistent storage and teacher history  
- Lesson delivery tied to AI-recommended learning paths  
- Class-level insights (patterns across students)  
- Accessibility audits and classroom testing  

---

## Final Note

I didn't try to build everything that would have to go into a proper LMS

But for the things I did build, I thought about what would help teachers and students the most and how they would want to interact with the application
