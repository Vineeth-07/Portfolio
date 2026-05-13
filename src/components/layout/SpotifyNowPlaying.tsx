import { useEffect, useState } from "react";
import { ExternalLink, Music4 } from "lucide-react";
import {
  fetchSpotifyNowPlaying,
  spotifyFallbackPlayback,
  type SpotifyPlayback,
} from "../../lib/spotify";

const formatTime = (milliseconds: number | null) => {
  if (milliseconds === null || Number.isNaN(milliseconds)) {
    return "--:--";
  }

  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formatPlayedAt = (playedAt: string | null) => {
  if (!playedAt) {
    return "Recently played";
  }

  return `Played ${new Date(playedAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;
};

export const SpotifyNowPlaying = () => {
  const [playback, setPlayback] = useState<SpotifyPlayback>(spotifyFallbackPlayback);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [clock, setClock] = useState(() => Date.now());

  useEffect(() => {
    const tickId = window.setInterval(() => {
      setClock(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(tickId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadPlayback = async () => {
      const nextPlayback = await fetchSpotifyNowPlaying(controller.signal);

      if (!isMounted) {
        return;
      }

      setPlayback(nextPlayback);
      setLastSyncedAt(Date.now());
      setIsLoading(false);
    };

    void loadPlayback();

    const pollId = window.setInterval(() => {
      void loadPlayback();
    }, 15000);

    return () => {
      isMounted = false;
      controller.abort();
      window.clearInterval(pollId);
    };
  }, []);

  const liveProgress =
    playback.status === "playing" &&
    playback.progressMs !== null &&
    playback.durationMs !== null &&
    lastSyncedAt !== null
      ? Math.min(playback.progressMs + Math.max(0, clock - lastSyncedAt), playback.durationMs)
      : playback.status === "recent" && playback.durationMs !== null
        ? playback.durationMs
        : playback.progressMs ?? 0;

  const progressWidth =
    playback.durationMs && playback.durationMs > 0
      ? `${Math.min(100, (liveProgress / playback.durationMs) * 100)}%`
      : "0%";

  const statusLabel =
    playback.status === "playing"
      ? "Now playing"
      : playback.status === "recent"
        ? "Last played"
        : isLoading
          ? "Loading Spotify"
          : "Spotify offline";

  const contextLine =
    playback.status === "playing"
      ? playback.album ?? "Live on Spotify"
      : playback.status === "recent"
        ? formatPlayedAt(playback.playedAt)
        : playback.message;

  return (
    <div className="spotify-panel">
      <div className="spotify-panel-art">
        {playback.artworkUrl ? (
          <img
            src={playback.artworkUrl}
            alt={playback.album ?? "Spotify album art"}
            className="spotify-panel-art-image"
          />
        ) : (
          <div className="spotify-panel-placeholder" aria-hidden="true">
            <Music4 size={24} />
          </div>
        )}
      </div>

      <div className="spotify-panel-body">
        <div className="spotify-panel-top">
          <div className="min-w-0">
            <p className="spotify-panel-kicker">Spotify Live</p>
            <div className="spotify-panel-status">
              <span
                className={`spotify-status-dot ${
                  playback.status === "playing"
                    ? "is-live"
                    : playback.status === "recent"
                      ? "is-recent"
                      : ""
                }`}
              />
              <span>{statusLabel}</span>
            </div>
          </div>

          {playback.songUrl ? (
            <a
              href={playback.songUrl}
              target="_blank"
              rel="noreferrer"
              className="spotify-panel-link"
              aria-label="Open current track in Spotify"
            >
              <ExternalLink size={15} />
            </a>
          ) : (
            <div
              className={`spotify-equalizer ${
                playback.status === "playing" ? "is-active" : ""
              }`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="spotify-track-title">
            {playback.title ?? "Spotify connection ready"}
          </p>
          <p className="spotify-track-artist">
            {playback.artists.length > 0
              ? playback.artists.join(", ")
              : "Your currently playing music will show up here."}
          </p>
          <p className="spotify-track-context">{contextLine}</p>
        </div>

        <div className="spotify-progress-wrap">
          <div className="spotify-progress-bar" aria-hidden="true">
            <span className="spotify-progress-fill" style={{ width: progressWidth }} />
          </div>
          <div className="spotify-progress-meta">
            <span>{playback.status === "offline" ? "--:--" : formatTime(liveProgress)}</span>
            <span>{playback.durationMs ? formatTime(playback.durationMs) : "--:--"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
