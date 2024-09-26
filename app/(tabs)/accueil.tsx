import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, ScrollView, Text, View } from "react-native";

import { SearchInput } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import ProductCard from "../../components/ProductCard";
import ServiceCard from "../../components/ServiceCard";
import React from "react";

const Accueil = () => {
  const { user } = useGlobalContext();

  const listingSuggestions = [
    {
      name: "Croquettes",
      image: images.packaging_product,
      link: "/croquettes",
    },
    {
      name: "Croquettes",
      image: images.packaging_product,
      link: "/croquettes",
      otherStyles: "ml-4",
    },
    {
      name: "Pâtée",
      image: images.packaging_product,
      link: "/patee",
      otherStyles: "ml-4",
    },
    {
      name: "Friandises",
      image: images.packaging_product,
      link: "/friandises",
      otherStyles: "ml-4",
    },
  ];

  const listingServicesPopulaires = [
    {
      name: "Promenades",
      image: images.bg_services_populaire_1,
      link: "/promenades",
    },
    {
      name: "Hébergement",
      image: images.bg_services_populaire_2,
      otherStyles: "ml-4",
      link: "/hebergement",
    },
    {
      name: "Visites à domicile",
      image: images.bg_services_populaire_3,
      otherStyles: "ml-4",
      link: "/visites-a-domicile",
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="flex-1 h-full">
        <View className="flex space-y-6 px-6 pb-12">
          <View className="flex justify-center items-center flex-col mb-6">
            <View className="w-full">
              <Text className="text-4xl text-left text-white mt-1 font-rbold">
                Besoin de quoi aujourd'hui ?
              </Text>
            </View>
          </View>

          <SearchInput initialQuery={""} />

          <View className="flex justify-between w-full flex-row items-center">
            <Text className="text-white text-base font-rsemibold">
              Suggestions alimentaires - {user?.username}{" "}
            </Text>
            <Text className="text-white font-rsemibold underline text-[10px] mr-1">
              Tout afficher
            </Text>
          </View>

          <ScrollView horizontal={true} className="flex flex-row">
            {listingSuggestions.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name}
                image={item.image}
                link={item.link}
                otherStyles={item.otherStyles}
              />
            ))}
          </ScrollView>

          <Text className="text-white text-base font-rsemibold">
            Services populaires
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
          >
            <View className="flex flex-row">
              {listingServicesPopulaires.map((item, index) => (
                <ServiceCard
                  key={index}
                  name={item.name}
                  image={item.image}
                  link={item.link}
                  otherStyles={item.otherStyles}
                />
              ))}
            </View>
          </ScrollView>

          <ImageBackground
            source={images.bg_balade_home}
            className="px-4 h-max w-max pb-3 max-w-screen overflow-hidden rounded-[8px]"
          >
            <Text className="text-white font-rbold text-[13px] pt-12">
              Promenade en cours - {user?.username}
            </Text>
            <Text className="text-white pt-4 pb-4 text-[11px] font-rregular">
              Aller voir où en est la balade !
            </Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accueil;
