import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MovieCard, SearchBar } from "@/components";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useFetch } from "@/hooks";
import { fetchMovies } from "@/services/api";
import { Movie } from "@/types";

export default function Index() {
  const router = useRouter();

  const { value, loading, error } = useFetch<Movie[]>({
    fn: () => fetchMovies({ qeuey: "" }),
  });

  return (
    <ImageBackground source={images.bg} className="w-full flex-1 bg-primary">
      <SafeAreaView className="w-full flex-1">
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          <Image source={icons.logo} className="mx-auto h-10 w-12" />

          {loading ? (
            <ActivityIndicator size="large" className="mt-10 self-center" color="#fff" />
          ) : error ? (
            <Text className="text-white">{error}</Text>
          ) : (
            <View className="mt-5 flex-1">
              <SearchBar onPress={() => router.push("/search")} placeholder="Search" />
              <Text className="mb-3 mt-5 text-lg font-bold text-white">Latest Moives</Text>

              <FlatList
                data={value}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return <MovieCard {...item} />;
                }}
                numColumns={3}
                className="mt-2 flex-1 pb-32"
                columnWrapperClassName="flex-start gap-5 pr-1 mb-2"
                scrollEnabled={false}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
