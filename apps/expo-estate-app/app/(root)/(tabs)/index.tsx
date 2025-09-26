import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { FeaturedCards, Cards, Search, Filters } from "@/components";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/service/global-provider";
import { useLocalSearchParams } from "expo-router";
import { useAppFetch } from "@/hooks";
import { getLatestProperties, getFilteredProperties } from "@/service/appwrite";
import { useEffect } from "react";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();
  const { data: lastestData, loading: lastestLoading } = useAppFetch({ fn: getLatestProperties });

  const { data, refetch } = useAppFetch({
    fn: getFilteredProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query, refetch]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Cards item={item} onPress={() => {}} />}
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
              data={lastestData}
              keyExtractor={(item) => item.$id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-4"
              bounces={false}
              renderItem={({ item }) => <FeaturedCards item={item} onPress={() => {}} />}
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
