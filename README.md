# NexLeaf – AI Career Navigator

NexLeaf is an AI-powered career navigation platform designed to help users explore career paths, identify skill gaps, analyze resumes, and plan their learning journey.

## Features

- **Career Exploration:** Browse career paths and discover required skills.
- **AI Career Guidance:** Get career-related guidance using Gemini AI.
- **Resume Analyzer:** Upload and analyze a resume.
- **Skill Gap Analysis:** Identify skills to develop for a target career.
- **Learning Roadmap:** Plan your career preparation journey.
- **Career Recommendations:** Explore career options aligned with your profile.
- **Projects and Courses:** Discover relevant projects and learning resources.
- **User Accounts:** Register and log in to access personalized features.

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express
- TypeScript

**Database**
- MySQL

**AI Integration**
- Google Gemini API (`@google/genai`)

## Prerequisites

- Node.js and npm
- MySQL Server
- A Google Gemini API key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Farhanpijwala/ai-career-navigator
cd ai-career-navigator
```



### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file in the project root and configure the environment variables required by the backend and database.

Use `.env.example` as a reference if it documents the required variables.

Add your Gemini API key and database credentials locally. Never commit `.env` or expose API keys and passwords on GitHub.

### 4. Set up the database

- Start your MySQL server.
- Create the `nexleaf_db` database.
- Execute the SQL schema from `database/schema.sql`.

Ensure your local database credentials match your environment configuration.

### 5. Run the application

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Environment Variables

Configure the variables required by your project's backend, including the Gemini API key, database connection settings, and authentication secret.

Refer to `.env.example` and the server configuration for the exact variable names.

## Project Status

NexLeaf is under active development. Features and setup instructions may evolve as the project improves.

## Security

- Never commit `.env` files, API keys, database passwords, or authentication secrets.
- Do not upload private resumes or real user data.
- Keep production secrets in your hosting provider's environment settings.

## License

No license has been specified yet.
