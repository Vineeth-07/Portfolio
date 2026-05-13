import fs from "node:fs";
import path from "node:path";
import type { SpotifyPlayback } from "./src/lib/spotify";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyEnv = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

type SpotifyImage = {
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrack = {
  name: string;
  duration_ms: number;
  external_urls?: {
    spotify?: string;
  };
  album?: {
    name: string;
    images: SpotifyImage[];
  };
  artists: SpotifyArtist[];
};

type CurrentlyPlayingResponse = {
  currently_playing_type?: string;
  is_playing: boolean;
  progress_ms: number | null;
  item: SpotifyTrack | null;
};

type RecentlyPlayedResponse = {
  items: Array<{
    played_at: string;
    track: SpotifyTrack;
  }>;
};

let hasLoadedLocalEnv = false;

const offlinePlayback = (message: string): SpotifyPlayback => ({
  status: "offline",
  title: null,
  artists: [],
  album: null,
  artworkUrl: null,
  songUrl: null,
  progressMs: null,
  durationMs: null,
  playedAt: null,
  message,
});

const spotifyScopeMessage =
  "Spotify permissions are missing. Regenerate the refresh token with user-read-currently-playing and user-read-recently-played.";
const spotifyPremiumPropagationMessage =
  "Spotify says Premium activation for the app owner can take a few hours before playback APIs are allowed.";

const getSpotifyForbiddenMessage = async (response: Response) => {
  const body = (await response.text()).trim();

  if (
    body.toLowerCase().includes("premium subscription required") ||
    body.toLowerCase().includes("subscription status changes")
  ) {
    return spotifyPremiumPropagationMessage;
  }

  return body || spotifyScopeMessage;
};

const loadEnvFileIntoProcessEnv = (filePath: string) => {
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

const ensureSpotifyEnvLoaded = () => {
  if (hasLoadedLocalEnv) {
    return;
  }

  hasLoadedLocalEnv = true;

  loadEnvFileIntoProcessEnv(path.join(process.cwd(), ".env.local"));
  loadEnvFileIntoProcessEnv(path.join(process.cwd(), ".env"));
};

const resolveSpotifyEnv = (): SpotifyEnv | null => {
  ensureSpotifyEnvLoaded();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    refreshToken,
  };
};

const mapTrackToPlayback = (
  track: SpotifyTrack,
  status: SpotifyPlayback["status"],
  options?: {
    progressMs?: number | null;
    playedAt?: string | null;
  },
): SpotifyPlayback => ({
  status,
  title: track.name,
  artists: track.artists.map((artist) => artist.name),
  album: track.album?.name ?? null,
  artworkUrl: track.album?.images[0]?.url ?? null,
  songUrl: track.external_urls?.spotify ?? null,
  progressMs:
    status === "playing"
      ? options?.progressMs ?? null
      : track.duration_ms,
  durationMs: track.duration_ms,
  playedAt: options?.playedAt ?? null,
  message:
    status === "playing"
      ? "Listening live on Spotify."
      : "Most recently played on Spotify.",
});

const getAccessToken = async (env: SpotifyEnv) => {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${env.clientId}:${env.clientSecret}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    access_token: string;
  };

  return data.access_token;
};

const getRecentlyPlayed = async (accessToken: string) => {
  const response = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 403) {
    return offlinePlayback(await getSpotifyForbiddenMessage(response));
  }

  if (!response.ok) {
    return offlinePlayback("Spotify recently-played data is unavailable.");
  }

  const data = (await response.json()) as RecentlyPlayedResponse;
  const recentItem = data.items[0];

  if (!recentItem?.track) {
    return offlinePlayback("No Spotify listening activity found yet.");
  }

  return mapTrackToPlayback(recentItem.track, "recent", {
    playedAt: recentItem.played_at,
  });
};

export const getSpotifyNowPlaying = async (): Promise<SpotifyPlayback> => {
  const env = resolveSpotifyEnv();

  if (!env) {
    return offlinePlayback("Add Spotify API credentials to enable live music.");
  }

  try {
    const accessToken = await getAccessToken(env);
    const response = await fetch(SPOTIFY_CURRENTLY_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 403) {
      return offlinePlayback(await getSpotifyForbiddenMessage(response));
    }

    if (response.status === 204) {
      return getRecentlyPlayed(accessToken);
    }

    if (!response.ok) {
      return getRecentlyPlayed(accessToken);
    }

    const data = (await response.json()) as CurrentlyPlayingResponse;

    if (
      data.currently_playing_type === "track" &&
      data.item &&
      data.is_playing
    ) {
      return mapTrackToPlayback(data.item, "playing", {
        progressMs: data.progress_ms,
      });
    }

    return getRecentlyPlayed(accessToken);
  } catch {
    return offlinePlayback("Spotify live feed could not be loaded.");
  }
};
