import { Stack } from "expo-router";
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";

export default function SettingsLayout() {
  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="personal-info/index" />
        <Stack.Screen name="my-animals/index" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
