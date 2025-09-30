import { Client, TablesDB, Query, ID, Models } from "react-native-appwrite";
import { Movie, TrendingMovie } from "@/types";

export const config = {
  platform: "com.heonys.movieapp",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  metricsTableId: "metrics",
};

export const client = new Client();

client //
  .setProject(config.projectId!)
  .setPlatform(config.platform)
  .setEndpoint(config.endpoint!);

export const tables = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await tables.listRows({
      databaseId: config.databaseId!,
      tableId: config.metricsTableId,
      queries: [Query.equal("searchTerm", query)],
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      tables.updateRow({
        databaseId: config.databaseId!,
        tableId: config.metricsTableId,
        rowId: existingMovie.$id,
        data: { count: existingMovie.count + 1 },
      });
    } else {
      tables.createRow({
        databaseId: config.databaseId!,
        tableId: config.metricsTableId,
        rowId: ID.unique(),
        data: {
          movie_id: movie.id,
          searchTerm: query,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          count: 1,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await tables.listRows<Models.DefaultRow & TrendingMovie>({
      databaseId: config.databaseId!,
      tableId: config.metricsTableId,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });
    return result.rows;
  } catch {
    return undefined;
  }
};
