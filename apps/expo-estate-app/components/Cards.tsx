import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

type Props = {
  item: Models.DefaultRow;
  onPress: () => void;
};

export function FeaturedCards({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="relative flex h-80 w-60 flex-col">
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />
      <Image source={images.cardGradient} className="absolute bottom-0 size-full rounded-2xl" />

      <View className="absolute right-5 top-5 flex flex-row items-center gap-1 rounded-full bg-white px-3 py-1.5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="font-rubik-bold text-xs text-primary-300">{item.rating}</Text>
      </View>

      <View className="absolute inset-x-6 bottom-5 flex items-start">
        <Text className="font-rubik-bold text-xl text-white" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="font-rubik text-sm text-white">{item.address}</Text>
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="font-rubik-extrabold text-lg text-white">{`$${item.price}`}</Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function Cards({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative mt-4 w-full flex-1 rounded-lg bg-white px-3 py-4 shadow-lg shadow-black-100/70"
    >
      <Image source={{ uri: item.image }} className="h-40 w-full rounded-lg" />

      <View className="absolute right-5 top-5 flex flex-row items-center gap-1 rounded-full bg-white/90 p-1">
        <Image source={icons.star} className="size-2.5" />
        <Text className="font-rubik-bold text-xs text-primary-300">{item.rating}</Text>
      </View>

      <View className="mt-2 flex">
        <Text className="font-rubik-semibold text-black-300">{item.name}</Text>
        <Text className="font-rubik text-xs text-black-200">{item.address}</Text>

        <View className="mt-2 flex w-full flex-row items-center justify-between">
          <Text className="font-rubik-bold text-primary-300">{`$${item.price}`}</Text>
          <Image source={icons.heart} className="mr-2 size-5" tintColor="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
