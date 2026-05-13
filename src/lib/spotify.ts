export type SpotifyPlaybackStatus = "playing" | "recent" | "offline";

export type SpotifyPlayback = {
  status: SpotifyPlaybackStatus;
  title: string | null;
  artists: string[];
  album: string | null;
  artworkUrl: string | null;
  songUrl: string | null;
  progressMs: number | null;
  durationMs: number | null;
  playedAt: string | null;
  message: string;
};

export const spotifyFallbackPlayback: SpotifyPlayback = {
  status: "offline",
  title: null,
  artists: [],
  album: null,
  artworkUrl: null,
  songUrl: null,
  progressMs: null,
  durationMs: null,
  playedAt: null,
  message: "Add Spotify credentials to show live listening.",
};

export const fetchSpotifyNowPlaying = async (
  signal?: AbortSignal,
): Promise<SpotifyPlayback> => {
  try {
    const response = await fetch("/api/spotify/now-playing", {
      headers: {
        Accept: "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Spotify request failed with ${response.status}`);
    }

    const data = (await response.json()) as SpotifyPlayback;

    return {
      ...spotifyFallbackPlayback,
      ...data,
      artists: Array.isArray(data.artists) ? data.artists : [],
      message: data.message ?? spotifyFallbackPlayback.message,
    };
  } catch {
    return {
      ...spotifyFallbackPlayback,
      message: "Spotify live feed is unavailable right now.",
    };
  }
};
