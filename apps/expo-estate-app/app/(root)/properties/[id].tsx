import { useAppFetch } from "@/hooks";
import { getPropertyById } from "@/service/appwrite";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Property() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data } = useAppFetch({
    fn: getPropertyById,
    params: { id: id! },
  });

  return (
    <SafeAreaView>
      <View>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  );
}
