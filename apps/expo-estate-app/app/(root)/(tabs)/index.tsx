import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { FeaturedCards, Cards, Search, Filters } from "@/components";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/service/global-provider";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={() => <Cards onPress={() => {}} />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-20"
        columnWrapperClassName="flex gap-4 px-4"
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between px-5">
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                <View className="ml-2 flex items-center justify-center">
                  <Text className="font-rubik text-xs text-black-100">Good Morning</Text>
                  <Text className="font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-rubik-bold text-xl text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={[1, 2, 3]}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-4"
              bounces={false}
              renderItem={() => <FeaturedCards onPress={() => {}} />}
            />

            <View className="my-4">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-rubik-bold text-xl text-black-300">Our Recommendation</Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
