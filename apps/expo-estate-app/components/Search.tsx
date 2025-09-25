import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "@/hooks";

export function Search() {
  const params = useLocalSearchParams<{ query: string }>();
  const [search, setSearch] = useState(params.query);
  const { debouncedFn } = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  });

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedFn(text);
  };

  return (
    <View className="mt-5 flex w-full flex-row items-center justify-between rounded-lg border-primary-100 bg-accent-100 px-4 py-2 ">
      <View className="flex flex-1 flex-row items-center">
        <Image source={icons.search} className="size-4" />
        <TextInput
          className="ml-2 flex-1 p-0.5 font-rubik text-black-300"
          placeholder="Search for anything"
          placeholderTextColor="#888888"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
}
