import { CustomButtonProps } from "@/type";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import cn from "clsx";

export function AppButton({
  onPress,
  title = "Click Me",
  textStyle,
  style,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity className={cn("custom-btn", style)} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={"white"} />
      ) : (
        <Text className={cn("paragraph-semibold text-white-100", textStyle)}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
