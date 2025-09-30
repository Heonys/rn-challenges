import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { TrendingMovie } from "@/types";
import { images } from "@/constants/images";

type Props = {
  index: number;
} & TrendingMovie;

export function TrendingCard({ title, movie_id, index, poster_url }: Props) {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="relative w-32 pl-5">
        <Image source={{ uri: poster_url }} className="h-48 w-32 rounded-lg" resizeMode="cover" />
        <View className="-lfet-3.5 absolute bottom-9 rounded-full px-2 py-1">
          <MaskedView
            style={{ flex: 1, flexDirection: "row", height: "100%" }}
            maskElement={<Text className="text-6xl font-bold text-white">{index + 1}</Text>}
          >
            <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
          </MaskedView>
        </View>

        <Text className="mt-2 text-sm font-bold text-white/50" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
