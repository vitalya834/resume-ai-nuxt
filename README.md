# Resume AI

Resume AI is a Nuxt application for improving professional profiles and
extracting the most important requirements from German job advertisements.

## Features

- Improve résumé and profile text without inventing qualifications
- Extract responsibilities, required skills, and relevant keywords
- Generate German cover-letter drafts from a vacancy and a profile
- Keep the OpenAI API key on the server

## Tech stack

- Nuxt 3 and Vue 3
- TypeScript
- Tailwind CSS
- OpenAI Responses API

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
npm install
copy .env.example .env
npm run dev
```

Set your API key in `.env`:

```dotenv
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.6-terra
```

Open `http://localhost:3000`.

## Security

The API key is read only by the Nuxt server route and is never sent to the
browser. Do not commit `.env` files or expose the key in client-side code.

## Production

Configure `OPENAI_API_KEY` as a secret environment variable in the hosting
platform. `OPENAI_MODEL` is optional and defaults to `gpt-5.6-terra`.
