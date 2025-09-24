import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/service/appwrite";
import { useGlobalContext } from "@/service/global-provider";
import { Redirect } from "expo-router";

export default function SignIn() {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      console.log("login success");
      // refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} resizeMode="contain" className="h-4/6 w-full" />
        <View className="px-10">
          <Text className="text-center font-rubik uppercase text-black-200">
            Welcome to Restate
          </Text>
          <Text className="mt-2 text-center font-rubik-bold text-3xl text-black-300">
            {`Let's Get You Closer to \n`}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="mt-12 text-center font-rubik text-lg text-black-200">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="mt-5 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300"
          >
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} resizeMode="contain" className="h-5 w-5" />
              <Text className="ml-2 font-rubik-medium text-lg text-black-300">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
