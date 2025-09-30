import { icons } from "@/constants/icons";
import { View, Image, TextInput } from "react-native";

type Props = {
  onPress: () => void;
  placeholder: string;
};

export function SearchBar({ onPress, placeholder }: Props) {
  return (
    <View className="flex flex-row items-center rounded-full bg-black/30 px-5 py-4">
      <Image source={icons.search} resizeMode="contain" className="size-5" tintColor="#ab8bff" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor="#a8b4db"
        className="ml-2 flex-1 text-white"
      />
    </View>
  );
}
