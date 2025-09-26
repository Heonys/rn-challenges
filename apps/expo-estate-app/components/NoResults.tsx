import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

export function NoResults() {
  return (
    <View className="my-5 flex items-center">
      <Image source={images.noResult} resizeMode="contain" className="h-80 w-11/12" />
      <Text className="font-rubik-bold text-2xl text-black-300">No Results</Text>
      <Text className="mt-2 text-black-100">We could not find any results</Text>
    </View>
  );
}
