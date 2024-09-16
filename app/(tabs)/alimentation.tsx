import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

import { SearchInput } from "../../components";

const Alimentation = () => {
  return (
    <SafeAreaView className="bg-primary min-h-screen">
      <View className="flex space-y-6 px-6">
        <View className="flex justify-center items-center flex-col mb-6">
          <View className="w-full">
            <Text className="text-4xl text-left text-white mt-1 font-rbold">
              Besoin de quoi aujourd'hui ?
            </Text>
          </View>
        </View>

        <SearchInput />
      </View>
    </SafeAreaView>
  );
};

export default Alimentation;
