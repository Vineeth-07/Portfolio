import { getSpotifyNowPlaying } from "../../spotify.server";

type NetlifyHandlerResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

export const handler = async (): Promise<NetlifyHandlerResponse> => {
  const playback = await getSpotifyNowPlaying();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=0, s-maxage=15, stale-while-revalidate=45",
    },
    body: JSON.stringify(playback),
  };
};
