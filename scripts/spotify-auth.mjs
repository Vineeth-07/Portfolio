import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DEFAULT_REDIRECT_URI = "http://127.0.0.1:5173/spotify-callback.html";
const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
];

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const raw = fs.readFileSync(filePath, "utf8");

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(path.join(ROOT, ".env"));
loadEnvFile(path.join(ROOT, ".env.local"));

const parseArgs = (values) => {
  const flags = {};

  for (let index = 0; index < values.length; index += 1) {
    const token = values[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const normalizedKey = token
      .slice(2)
      .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    const next = values[index + 1];

    if (!next || next.startsWith("--")) {
      flags[normalizedKey] = "true";
      continue;
    }

    flags[normalizedKey] = next;
    index += 1;
  }

  return flags;
};

const printUsage = () => {
  console.log(`
Spotify auth helper

Commands:
  npm run spotify:auth-url
  npm run spotify:exchange -- --code YOUR_CODE

Optional flags:
  --redirect-uri http://127.0.0.1:5173/spotify-callback.html

Environment:
  SPOTIFY_CLIENT_ID
  SPOTIFY_CLIENT_SECRET
  SPOTIFY_REDIRECT_URI (optional)
`.trim());
};

const command = process.argv[2];
const flags = parseArgs(process.argv.slice(3));
const redirectUri =
  flags.redirectUri || process.env.SPOTIFY_REDIRECT_URI || DEFAULT_REDIRECT_URI;

if (!command || command === "--help" || command === "help") {
  printUsage();
  process.exit(0);
}

if (command === "url") {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    console.error("Missing SPOTIFY_CLIENT_ID. Add it to .env.local first.");
    process.exit(1);
  }

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", SPOTIFY_SCOPES.join(" "));
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("show_dialog", "true");

  console.log("");
  console.log("Use this exact redirect URI in the Spotify dashboard:");
  console.log(redirectUri);
  console.log("");
  console.log("Open this URL to authorize:");
  console.log(authUrl.toString());
  console.log("");
  process.exit(0);
}

if (command === "exchange") {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const code = flags.code;

  if (!clientId || !clientSecret) {
    console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local.");
    process.exit(1);
  }

  if (!code) {
    console.error("Missing --code. Example: npm run spotify:exchange -- --code YOUR_CODE");
    process.exit(1);
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Spotify token exchange failed:");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log("");
  console.log("Spotify refresh token generated successfully.");
  console.log("");
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token ?? ""}`);
  console.log("");
  console.log("Add that line to your .env.local file.");
  console.log("");
  process.exit(0);
}

console.error(`Unknown command: ${command}`);
printUsage();
process.exit(1);
