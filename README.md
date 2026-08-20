# AI Tool Calling Chat App

An AI-enhanced study productivity application built with **Next.js, React, TypeScript, the Vercel AI SDK, and Groq**. StudyFlow helps students organize tasks, plan study sessions, track progress, manage study preferences, and interact with an AI assistant that can use tools to retrieve task information.

## Live Application

**Production:** https://todo-foundation-qub2.vercel.app/

**Repository:** https://github.com/nimraiqbal921/todo-foundation/tree/phase-tool-calling

---

## Project Brief

StudyFlow is designed for students who want a simple way to organize academic tasks and turn them into manageable study sessions. The application combines traditional productivity features such as tasks, profiles, progress tracking, and study planning with an AI assistant that can meaningfully interact with application tools. I chose this idea because students often have difficulty deciding what to work on first and how to divide their workload into realistic study sessions.

---

## Features

### AI Assistant

* Streaming AI chat interface
* Powered by Groq and the Vercel AI SDK
* Server-side AI tool calling
* `getTodos` tool for retrieving categorized todos
* Natural-language task queries such as:

  * "Show me my tasks"
  * "Show me my study tasks"
* Error handling for failed tool execution
* Loading and error states in the chat interface

### Task Management

* View and manage study tasks
* Track completed and remaining tasks
* Task progress contributes to the profile and dashboard experience

### AI Study Planner

* Helps turn workload into manageable study sessions
* Considers deadlines and task priorities
* Provides planning recommendations using AI

### Profile

The profile page contains:

* Name
* Academic focus
* Study goal
* Preferred study-session length
* Break preference
* Planning style
* Default priority
* Automatically calculated task progress
* Planning preferences

### Study Health

* Study-health checklist
* Encourages sustainable study habits
* Provides a separate area for reviewing study workload and habits

### Dashboard

Provides an overview of the user's study activity and progress.

---

## Technology Stack

| Technology    | Purpose                      |
| ------------- | ---------------------------- |
| Next.js 16    | Application framework        |
| React 19      | UI                           |
| TypeScript    | Type-safe development        |
| Tailwind CSS  | Styling                      |
| Vercel AI SDK | AI integration and streaming |
| Groq          | LLM provider                 |
| Zod           | Tool input validation        |
| Lucide React  | Icons                        |
| Playwright    | End-to-end testing           |
| axe-core      | Accessibility testing        |
| Vercel        | Production deployment        |

---

## Getting Started

### Requirements

* Node.js
* npm
* A Groq API key

### Installation

Clone the repository and enter the application directory:

```bash
git clone https://github.com/nimraiqbal921/todo-foundation.git
cd todo-foundation/todo-app/my-app
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root.

Add the Groq API key used by the application:

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit `.env.local` or expose API keys in client-side code.

### Run Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production Build

To verify that the application can be built for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

---

## Architecture Overview

The application uses the Next.js App Router.

```text
my-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── dashboard/
│   ├── planner/
│   ├── profile/
│   ├── projects/
│   ├── study-health/
│   ├── tasks/
│   ├── about/
│   ├── contact/
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   └── Chat.tsx
│
├── lib/
│   ├── ai.ts
│   └── tools.ts
│
├── tests/
│   ├── chat.spec.ts
│   └── accessibility.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

### Main Responsibilities

**`app/`**

Contains the application's routes and pages.

**`components/`**

Contains reusable UI components, including the AI chat interface.

**`lib/ai.ts`**

Defines the AI model and system prompt.

**`lib/tools.ts`**

Defines server-side AI tools and validates tool inputs using Zod.

**`app/api/chat/route.ts`**

Receives chat requests, passes messages to the AI model, exposes the available tools, and returns the streaming AI response.

**`tests/`**

Contains automated Playwright and axe accessibility tests.

---

## AI Integration

The AI assistant uses the **Vercel AI SDK** with **Groq** as the model provider.

The model is configured in `lib/ai.ts`:

```ts
import { groq } from "@ai-sdk/groq";

export const MODEL = groq("openai/gpt-oss-120b");
```

The chat API is handled server-side through:

```text
POST /api/chat
```

The route uses `streamText()` to generate a streaming response and exposes the `getTodos` tool to the model.

### Tool Calling

The application provides an AI tool named:

```text
getTodos
```

The tool accepts a category such as:

```text
study
work
personal
```

The AI system prompt instructs the assistant to call this tool when the user asks about todos or tasks rather than inventing a task list.

For example:

```text
User:
Show me my study tasks
```

The model can determine that the `getTodos` tool should be used with:

```json
{
  "category": "study"
}
```

The tool validates its input using Zod before executing.

### Why AI Is Used

AI is not only used as a conversational interface. The assistant can interpret natural-language task requests and connect those requests to an application capability through tool calling.

This demonstrates a practical AI interaction pattern:

```text
User request
     ↓
AI model
     ↓
Tool selection
     ↓
getTodos
     ↓
Structured result
     ↓
AI response
```

---

## Error Handling

The application includes multiple failure-handling paths.

### Chat API Errors

The `/api/chat` route is wrapped in a `try/catch` block. If request processing fails, the API returns an HTTP 500 response with an error message instead of crashing the application.

### Tool Errors

The `getTodos` tool contains an intentional failure path for testing:

```text
category = "error"
```

This allows the application to test how tool failures are handled.

### Client Error States

The chat interface displays an error state when an AI request cannot be completed, allowing the user to retry rather than leaving the interface in a broken state.

---

## Testing

The project uses **Playwright** for end-to-end testing and **axe-core** for automated accessibility testing.

### Run all Playwright tests

```bash
npx playwright test
```

### Run the AI chat test

```bash
npx playwright test tests/chat.spec.ts
```

The critical chat flow test verifies that:

1. The application loads.
2. The AI chat interface is visible.
3. The user can enter a message.
4. The user can send the message.
5. The submitted user message appears in the conversation.

### Accessibility Test

```bash
npx playwright test tests/accessibility.spec.ts
```

The accessibility test scans the homepage using axe and checks for accessibility violations.

During development, the audit initially detected duplicate `<main>` landmarks. The unnecessary wrapper around the Chat component was removed, after which the accessibility test passed.

### Test Evidence

The final Playwright chat test passed successfully:

```text
1 passed (11.9s)
```

The accessibility test was also updated to verify that the homepage has no detected axe violations.

---

## Performance & Accessibility Audit

A Lighthouse audit was performed against the deployed application.

| Category       | Score |
| -------------- | ----: |
| Performance    |    72 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |   100 |

The Lighthouse run reported that browser extensions negatively affected the performance measurement, so the performance score may vary between runs.

### Accessibility Improvement

The accessibility audit identified duplicate/nested main landmarks on the homepage.

The original homepage wrapped the Chat component in an additional `<main>` element while the Chat component already contained a main landmark.

The unnecessary wrapper was removed so that the document has a single top-level main landmark.

This improved the application's semantic accessibility structure.

---

## Deployment

The application is deployed using **Vercel**.

Production branch:

```text
phase-tool-calling
```

The production deployment is built from the GitHub repository and deployed automatically through Vercel.

### Deployment Checklist

* [x] Application builds successfully
* [x] Production deployment created
* [x] Production URL verified
* [x] AI chat tested in production
* [x] Task pages tested
* [x] Planner tested
* [x] Profile tested
* [x] Study Health tested
* [x] Playwright E2E test added
* [x] Accessibility test added
* [x] Lighthouse audit performed
* [x] Accessibility score verified
* [x] Production error handling tested
* [x] Changes committed to Git
* [x] Changes pushed to GitHub

---

## Safe Failure & Recovery

The application is designed to fail safely when an AI request or tool execution cannot be completed.

Instead of allowing an exception to break the entire interface, the API returns an error response and the client displays an error state that allows the user to retry.

### Rollback Plan

The project is version controlled with Git and deployed through Vercel.

If a production deployment introduces a regression, the previous working deployment can be restored through Vercel, or the repository can be reverted to a known-good Git commit and redeployed.

---

## Known Limitations

### Todo Tool Data

The current `getTodos` AI tool uses structured sample todo data rather than directly reading every task stored by the application's task-management UI.

This was intentionally kept small for the capstone's tool-calling demonstration.

### Authentication

The application does not currently include a full user authentication system.

### Persistent User Accounts

Profile preferences are currently presented as application-level study preferences rather than a complete multi-user account system.

### AI Dependency

AI functionality depends on the configured Groq API and available model access. If the provider is unavailable or the API request fails, the application displays an error state instead of generating a response.

### Performance

The Lighthouse performance score can vary depending on the device, network, browser extensions, and deployment conditions.

---

## Future Improvements

Possible future improvements include:

1. Connect `getTodos` directly to the application's persistent task data.
2. Add authentication and individual user accounts.
3. Persist profile and study preferences in a database.
4. Add more AI tools for creating, updating, and completing tasks.
5. Allow the AI planner to automatically create study sessions.
6. Add richer task filtering and search.
7. Improve mobile performance and reduce initial JavaScript.
8. Add additional unit and end-to-end tests.
9. Add monitoring and error tracking for production.
10. Add database-backed analytics for long-term study progress.

---

## Project Structure

The application demonstrates the following production-oriented concepts:

* Component-based frontend architecture
* Server-side AI integration
* AI tool calling
* Structured tool input validation
* Streaming AI responses
* Client-side error states
* Automated E2E testing
* Automated accessibility testing
* Production deployment
* Git-based version control
* Lighthouse auditing
* Accessibility-first development

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production application
npm run build

# Start production server
npm run start

# Run Playwright tests
npx playwright test

# Run chat E2E test
npx playwright test tests/chat.spec.ts

# Run accessibility test
npx playwright test tests/accessibility.spec.ts

# Run linting
npm run lint
```

---

## Author

**Nimra**

Computer Science student and frontend/AI engineering learner.

This project was developed as a production-focused capstone demonstrating frontend engineering, AI integration, testing, accessibility, deployment, and technical documentation.
