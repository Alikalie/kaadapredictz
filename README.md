# KAADA PREDICTZ

create website with name "KAADA PREDICTZ" with a pink and black design for t

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```powershell
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

## Deploy to Vercel

Import this repository into Vercel and use `npm run build` as the build command. The Vite configuration selects Nitro's Vercel preset, which generates the Vercel deployment output.

Before deploying, add these environment variables in the Vercel project settings:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL used by server-side requests |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key used by server-side requests |
| `VITE_SUPABASE_URL` | Supabase project URL used by the browser |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key used by the browser |

Set them for each environment you deploy (Production, Preview, and Development as needed), then redeploy after changing the values.
