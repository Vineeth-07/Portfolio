import { getSpotifyNowPlaying } from "../../spotify.server";

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  statusCode: number;
  end: (body?: string) => void;
};

export default async function handler(_request: unknown, response: ApiResponse) {
  const playback = await getSpotifyNowPlaying();

  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "public, s-maxage=15, stale-while-revalidate=45");
  response.statusCode = 200;
  response.end(JSON.stringify(playback));
}
