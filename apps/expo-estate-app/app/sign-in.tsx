import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function SignIn() {
  const handleLogin = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} resizeMode="contain" className="h-4/6 w-full" />
        <View className="px-10">
          <Text className="font-rubik text-black-200 text-center uppercase">
            Welcome to Restate
          </Text>
          <Text className="font-rubik-bold text-black-300 mt-2 text-center text-3xl">
            {`Let's Get You Closer to \n`}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="font-rubik text-black-200 mt-12 text-center text-lg">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="mt-5 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300"
          >
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} resizeMode="contain" className="h-5 w-5" />
              <Text className="font-rubik-medium text-black-300 ml-2 text-lg">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
