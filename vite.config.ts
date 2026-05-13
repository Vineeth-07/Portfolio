import type { IncomingMessage, ServerResponse } from "node:http";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { getSpotifyNowPlaying } from "./spotify.server";

const spotifyNowPlayingDevApi = (): Plugin => {
  const handleRequest = (
    request: IncomingMessage & { url?: string },
    response: ServerResponse<IncomingMessage>,
    next: () => void,
  ) => {
    if (!request.url?.startsWith("/api/spotify/now-playing")) {
      next();
      return;
    }

    void (async () => {
      const playback = await getSpotifyNowPlaying();

      response.setHeader("Content-Type", "application/json");
      response.setHeader("Cache-Control", "no-store");
      response.statusCode = 200;
      response.end(JSON.stringify(playback));
    })();
  };

  return {
    name: "spotify-now-playing-dev-api",
    configureServer(server) {
      server.middlewares.use(handleRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleRequest);
    },
  };
};

export default defineConfig({
  plugins: [react(), spotifyNowPlayingDevApi()],
});
