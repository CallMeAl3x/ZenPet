import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

import { SearchInput } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Alimentation = () => {
  const { user } = useGlobalContext();

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

        <View>
          <Text className="text-white text-base font-rsemibold">
            Suggestions alimentaires - {user?.username}
          </Text>
        </View>

        <SearchInput />
      </View>
    </SafeAreaView>
  );
};

export default Alimentation;
