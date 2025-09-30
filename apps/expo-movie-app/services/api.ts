const CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: process.env.EXPO_PUBLIC_MOVIE_APP_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_APP_KEY}`,
  },
};

export const fetchMovies = async (props?: { qeuey: string }) => {
  const endPoint = props?.qeuey
    ? `${CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(props.qeuey)}`
    : `${CONFIG.baseUrl}/discover/movie?sort_by=popularity.desc`;

  const responese = await fetch(endPoint, { method: "GET", headers: CONFIG.headers });
  if (!responese.ok) throw new Error("Failed to fetch movies");

  const data = await responese.json();
  return data.results;
};
