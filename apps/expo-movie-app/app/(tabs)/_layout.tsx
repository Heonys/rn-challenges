import { Tabs } from "expo-router";
import { Image, ImageBackground, ImageSourcePropType, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.home} title="Home" />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.search} title="Search" />;
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.save} title="Saved" />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.person} title="Profile" />;
          },
        }}
      />
    </Tabs>
  );
}

type Props = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TabIcon = ({ focused, icon, title }: Props) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="mt-4 flex min-h-16 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
      >
        <Image source={icon} className="size-5" tintColor="#151312" />
        <Text className="ml-2 text-sm font-semibold text-secondary">{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View className="mt-4 flex size-full items-center justify-center rounded-full">
      <Image source={icon} tintColor="#a8b5db" className="size-5" />
    </View>
  );
};
