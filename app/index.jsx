import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../constants";
import { CustomButton } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/alimentation" />;

  return (
    <ImageBackground
      source={images.backgroundRegister0}
      className="w-full h-full"
    >
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex h-full px-8 my-3 font-rregular">
            <Text className="text-4xl text-white mt-6 font-rbold">
              Bienvenue sur ZenPet !
            </Text>

            <Text className="text-base text-white mt-3 font-rmedium">
              Chez ZenPet, nous comprenons que vos animaux de compagnie sont des
              membres à part entière de votre famille. C'est pourquoi nous nous
              engageons à offrir des services de la plus haute qualité.
            </Text>

            <View className="flex flex-row gap-2 mt-3">
              <View className="h-2 w-5 bg-white rounded-[37px]"></View>
              <View className="h-2 w-2 bg-white opacity-[0.65] rounded-[37px]"></View>
              <View className="h-2 w-2 bg-white opacity-[0.65] rounded-[37px]"></View>
            </View>

            <Text className="mt-auto text-white font-rmedium text-center text-md">
              Inscription ou connexion :
            </Text>

            <CustomButton
              image={icons.mail}
              title="Se connecter"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full"
              style={{ marginTop: 10 }}
              textStyles={"text-white"}
            />

            <CustomButton
              image={icons.mail}
              title="S'inscrire"
              handlePress={() => router.push("/sign-up")}
              containerStyles="w-full"
              style={{ marginBottom: 70, marginTop: 30 }}
              textStyles={"text-white"}
            />
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;
