# Vineeth Portfolio

Tech portfolio built with React, TypeScript, and Vite.

## Local Development

```bash
npm install
npm run dev
```

## Spotify Setup

Create a local env file from [.env.example](.env.example):

```bash
cp .env.example .env.local
```

Set these values:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

`SPOTIFY_REDIRECT_URI` is only needed when generating a refresh token locally.

Use the helper if you need a refresh token:

```bash
npm run spotify:auth-url
npm run spotify:exchange -- --code YOUR_CODE
```

## Netlify Deployment

This project is configured for Netlify with [netlify.toml](netlify.toml).

Netlify uses:

- build command: `npm run build`
- publish directory: `dist`
- functions directory: `netlify/functions`
- Spotify function: [netlify/functions/spotify-now-playing.ts](netlify/functions/spotify-now-playing.ts)

### Netlify Environment Variables

Add these in `Site configuration -> Environment variables`:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

You do not need `SPOTIFY_REDIRECT_URI` in Netlify unless you want to generate tokens from a deployed environment.

### Spotify on Netlify

The frontend keeps requesting:

- `/api/spotify/now-playing`

Netlify redirects that path to:

- `/.netlify/functions/spotify-now-playing`

so the Spotify card continues to work in production without changing the client code.

### Deploy Steps

1. Push this repo to GitHub.
2. Import the repo into Netlify.
3. Netlify will read `netlify.toml` automatically.
4. Add the Spotify environment variables.
5. Trigger a deploy.

After deploy, the portfolio should be live and the Spotify card should run through the Netlify function.
