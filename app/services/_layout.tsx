import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";

export default function ServicesLayout() {
  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.push("/services");
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="promenades/index" />
        {/* <Stack.Screen name="my-animals/index" /> */}
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
