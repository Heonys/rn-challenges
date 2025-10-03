import { AppButton, AppInput } from "@/components";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Alert } from "react-native";

export default function SignUp() {
  // const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; password: string }>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      return Alert.alert("Error", "Please enter valid emial and password");
    }

    setIsSubmitting(true);

    try {
      //
      Alert.alert("Success", "User signed in succedssfully");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="mt-5 gap-10 rounded-lg bg-white p-5">
      <AppInput
        placeholder="Enter your full name"
        value={form.name}
        label="Name"
        onChangeText={(name) => setForm((prev) => ({ ...prev, name }))}
      />

      <AppInput
        placeholder="Enter your eamil"
        value={form.email}
        label="Email"
        onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
        keyboardType="email-address"
      />
      <AppInput
        placeholder="Enter your password"
        value={form.password}
        label="Password"
        onChangeText={(password) => setForm((prev) => ({ ...prev, password }))}
        secureTextEntry
      />
      <AppButton title="Sign Up" isLoading={isSubmitting} onPress={handleSubmit} />

      <View className="mt-5 flex flex-row justify-center gap-2">
        <Text className="base-regular text-gray-100">Already have an acount?</Text>
        <Link className="base-bold text-primary" href={"/sign-in"}>
          Sign In
        </Link>
      </View>
    </View>
  );
}
