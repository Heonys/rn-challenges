import { icons } from "@/constants/icons";
import { View, Image, TextInput } from "react-native";

type Props = {
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  placeholder: string;
};

export function SearchBar({ value, onPress, placeholder, onChangeText }: Props) {
  return (
    <View className="flex flex-row items-center rounded-full bg-black/30 px-5 py-4">
      <Image source={icons.search} resizeMode="contain" className="size-5" tintColor="#ab8bff" />
      <TextInput
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a8b4db"
        className="ml-2 flex-1 text-white"
      />
    </View>
  );
}
