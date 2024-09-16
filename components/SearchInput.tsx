import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }: { initialQuery: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-3 w-full h-16 px-4 bg-white rounded-[8px] border-2 focus:border-secondary">
      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5 ml-1.5"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TextInput
        className="text-base text-black flex-1 font-rmedium"
        value={query}
        placeholder="Rechercher"
        placeholderTextColor="#000000"
        onChangeText={(e) => setQuery(e)}
      />
    </View>
  );
};

export default SearchInput;
