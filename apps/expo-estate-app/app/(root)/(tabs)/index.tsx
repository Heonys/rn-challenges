import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="my-10 text-lg font-bold">Welcome to Nativewind</Text>
      <Link href="/sign-in">Sign in</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/properties/1">Properties</Link>
    </View>
  );
}
