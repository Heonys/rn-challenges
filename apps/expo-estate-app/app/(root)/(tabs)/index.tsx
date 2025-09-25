import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";
import { Search } from "@/components";
import icons from "@/constants/icons";
import images from "@/constants/images";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex flex-row items-center justify-between px-5">
        <View className="flex flex-row items-center">
          <Image source={images.avatar} className="size-12 rounded-full" />
          <View className="ml-2 flex items-center justify-center">
            <Text className="font-rubik text-xs text-black-100">Good Morning</Text>
            <Text className="font-rubik-medium text-black-300">Jiheon</Text>
          </View>
        </View>
        <Image source={icons.bell} className="size-6" />
      </View>
      <Search />
    </SafeAreaView>
  );
}
