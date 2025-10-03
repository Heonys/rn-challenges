import { CustomInputProps } from "@/type";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import cn from "clsx";

export function AppInput({
  label,
  keyboardType,
  onChangeText,
  placeholder,
  secureTextEntry,
  value,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#888"
        className={cn("input", isFocused ? "border-primary" : "border-gray-300")}
      />
    </View>
  );
}
