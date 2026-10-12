# KAADA PREDICTZ

KAADA PREDICTZ is a football predictions and analysis website. It provides match previews, prediction results, market guides, member accounts, and VIP content.

## Requirements

- Node.js
- npm
- Supabase project credentials for data and authentication

## Getting started

Install dependencies and start the local development server:

```powershell
npm ci
npm run dev
```

Create a local `.env` file with the required Supabase settings:

| Variable | Used by |
| --- | --- |
| `SUPABASE_URL` | Server-side Supabase requests |
| `SUPABASE_PUBLISHABLE_KEY` | Server-side Supabase requests |
| `VITE_SUPABASE_URL` | Browser-side Supabase requests |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser-side Supabase requests |

Use the values for your own Supabase project. Do not commit `.env` files or credentials.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the test suite |
| `npm run lint` | Check the code with ESLint |

## Project structure

- `src/routes/` contains the file-based TanStack Start pages.
- `src/components/` contains shared page components and UI primitives.
- `src/lib/` contains application data access and server functions.
- `src/integrations/supabase/` contains Supabase client and authentication integration.
- `drizzle/` contains the database schema and migrations.

See [`src/routes/README.md`](src/routes/README.md) for route conventions.

## Deployment

The project is configured for Vercel. Import the repository into Vercel, configure the four Supabase environment variables above for the environments you use, and deploy using the `npm run build` build command.
