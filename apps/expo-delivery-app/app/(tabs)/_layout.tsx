import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
    </Tabs>
  );
}
