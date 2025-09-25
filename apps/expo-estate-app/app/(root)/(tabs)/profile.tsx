import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from "@/service/appwrite";
import { useGlobalContext } from "@/service/global-provider";
import { cn } from "@/utils/common";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred white logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
        <View className="mt-5 flex flex-row items-center justify-between">
          <Text className="font-rubik-bold text-xl">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="mt-5 flex flex-row justify-center">
          <View className="relative mt-5 flex items-center">
            <Image source={{ uri: user?.avatar }} className="size-44 rounded-full" />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="mt-2 font-rubik-bold text-2xl">{user?.name}</Text>
          </View>
        </View>

        <View className="mt-10 flex">
          <SettingsItem icon={icons.calendar} title="My Booking" />
          <SettingsItem icon={icons.calendar} title="My Booking" />
        </View>

        <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
          {settings.slice(2).map((setting) => {
            return <SettingsItem key={setting.title} {...setting} />;
          })}
        </View>

        <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textClassName="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type SettingsItemProps = {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textClassName?: string;
  showArrow?: boolean;
};

function SettingsItem({
  icon,
  title,
  onPress,
  textClassName,
  showArrow = true,
}: SettingsItemProps) {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={cn("font-rubik-medium text-lg text-black-300", textClassName)}>
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
}
