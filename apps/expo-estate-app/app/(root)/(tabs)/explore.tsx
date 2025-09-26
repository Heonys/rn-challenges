import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Cards, Filters, NoResults, Search } from "@/components";
import { router, useLocalSearchParams } from "expo-router";
import { useAppFetch } from "@/hooks";
import { getFilteredProperties } from "@/service/appwrite";
import { useEffect } from "react";
import icons from "@/constants/icons";

export default function Explore() {
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();

  const { data, refetch, loading } = useAppFetch({
    fn: getFilteredProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Cards item={item} onPress={() => {}} />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="mt-5 text-primary-300" />
          ) : (
            <NoResults />
          )
        }
        numColumns={2}
        contentContainerClassName="pb-20"
        columnWrapperClassName="flex gap-4 px-4"
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="mt-5 flex flex-row items-center justify-between">
              <TouchableOpacity
                className="flex size-11 flex-row items-center justify-center rounded-full bg-primary-200"
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="mr-2 text-center font-rubik-medium text-black-300">
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="mt-2">
              <Filters />
              <Text className="mt-5 font-rubik-bold text-xl text-black-300">{`Found ${data?.length} Properties`}</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
