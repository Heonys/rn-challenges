import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import icons from "@/constants/icons";
import { cn } from "@/utils/common";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  return (
    <View className="mt-3 flex-1 flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#0051ff" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={cn(
          focused ? "font-rubik-medium text-primary-300" : "font-rubik text-black-200",
          "mt-1 w-full text-center text-xs",
        )}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061ff1a",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon title="Home" focused={focused} icon={icons.home} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Explore" focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" focused={focused} icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
}
