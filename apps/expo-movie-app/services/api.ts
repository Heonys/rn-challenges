import { MovieDetails } from "@/types";

const config = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: process.env.EXPO_PUBLIC_MOVIE_APP_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_APP_KEY}`,
  },
};

export const fetchMovies = async (props?: { qeuey: string }) => {
  const endPoint = props?.qeuey
    ? `${config.baseUrl}/search/movie?query=${encodeURIComponent(props.qeuey)}`
    : `${config.baseUrl}/discover/movie?sort_by=popularity.desc`;

  const responese = await fetch(endPoint, { method: "GET", headers: config.headers });
  if (!responese.ok) throw new Error("Failed to fetch movies");

  const data = await responese.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(`${config.baseUrl}/movie/${id}?app_key=${config.apiKey}`, {
      method: "GET",
      headers: config.headers,
    });

    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    return data as MovieDetails;
  } catch (error) {
    console.error(error);
  }
};
