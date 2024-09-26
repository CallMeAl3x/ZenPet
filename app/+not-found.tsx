import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import Header from "../components/Header";

const NotFound = () => {
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!hasRedirected) {
      Toast.show({
        type: "error",
        text1: "Page introuvable",
        text2: "Vous allez être redirigé vers l'accueil",
        onPress: () => {
          // Handle the onPress event
          router.replace("/accueil");
          setHasRedirected(true);
        },
      });

      const timer = setTimeout(() => {
        router.replace("/accueil");
        setHasRedirected(true);
      }, 100000);

      return () => clearTimeout(timer);
    }
  }, [router, hasRedirected]);

  return (
    <>
      <Header />
      <View className="flex-1 justify-center items-center h-screen bg-primary w-screen">
        <Text className="text-white text-2xl max-w-[240px] text-center leading-[45px]">
          404 - Page introuvable ou non accessible !
        </Text>
      </View>
    </>
  );
};

export default NotFound;
