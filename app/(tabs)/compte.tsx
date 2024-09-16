import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AccountOption from "../../components/AccountOption";
import { signOut } from "../../lib/appwrite";
const Compte = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full items-center flex">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            alignItems: "center",
          }}
          className="w-full"
        >
          <View className="flex w-full px-1 flex-row items-center">
            <View className="justify-start items-start">
              <Image
                source={{ uri: user?.avatar }}
                className="w-24 h-24 rounded-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex flex-col ml-3 flex-1">
              <Text className="font-rbold text-[28px] text-white">
                {user?.firstName}
              </Text>
              <Text
                className="font-rsemibold text-base text-[#A8D5BA]"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {user?.email}
              </Text>
            </View>
          </View>

          {/* Partie paramètres/transactions */}
          <View className="w-full mt-10">
            <View className="flex flex-col gap-2.5 w-full">
              <Text className="font-rsemibold text-lg text-white">
                Mes transactions
              </Text>

              <View className="flex flex-col w-full">
                <AccountOption
                  icon={icons.calendar}
                  texte="Mon abonnement"
                  link={"/test"}
                />
                <AccountOption
                  icon={icons.calendar}
                  texte="Mon panier"
                  style="mt-6"
                />
              </View>
            </View>

            <View className="flex flex-col gap-2.5 w-full mt-6">
              <Text className="font-rsemibold text-lg text-white">Général</Text>

              <View className="flex flex-col w-full">
                <AccountOption
                  icon={icons.animalPaw}
                  texte="Mes animaux"
                  style="mt-3"
                  link="my-animals"
                />
                <AccountOption
                  icon={icons.personalInfo}
                  texte="Informations personnels"
                  style="mt-6"
                  link="personal-info"
                />
              </View>
            </View>
          </View>

          {/* Partie déconnection */}
          <View className="w-full mt-8 mb-10">
            <TouchableOpacity
              onPress={logout}
              className="w-full flex justify-center items-center py-4 bg-white rounded-[8px]"
            >
              <Text className="font-rsemibold text-base text-primary">
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Compte;
