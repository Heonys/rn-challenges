import { View, Text, ImageBackground, FlatList, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MovieCard, SearchBar } from "@/components";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks";
import { fetchMovies } from "@/services/api";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { updateSearchCount } from "@/services/appwrite";

export default function Search() {
  const [search, setSearch] = useState("");

  const { value, loading, error, refetch, reset } = useFetch<Movie[]>({
    fn: () => fetchMovies({ qeuey: search }),
    lazy: true,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim()) {
        refetch().then((movies) => {
          if (movies && movies.length > 0 && movies[0]) {
            updateSearchCount(search, movies[0]);
          }
        });
      } else reset();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <ImageBackground source={images.bg} className="w-full flex-1 bg-primary" resizeMode="cover">
      <SafeAreaView className="w-full flex-1">
        <FlatList
          data={value ?? []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
          numColumns={3}
          className="px-5"
          columnWrapperClassName="gap-5 my-4"
          ListHeaderComponent={
            <View className="w-full items-start justify-center">
              <Image source={icons.logo} className="mx-auto h-10 w-12" />
              <View className="my-5 w-full">
                <SearchBar
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                  placeholder="Search"
                />
              </View>

              {loading && <ActivityIndicator size="large" className="my-3" color="#0000ff" />}
              {error && <Text className="my-3 px-5 text-red-500">Error: {error}</Text>}
              {!loading && !error && search.trim() && value && value.length > 0 && (
                <Text className="text-xl font-bold text-white">
                  Search Result for <Text className="text-darkAccent">{search}</Text>
                </Text>
              )}
            </View>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {search.trim() ? "No movies found" : "Search for a movie"}
                </Text>
              </View>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
