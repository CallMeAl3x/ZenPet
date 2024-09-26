import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ScrollView } from "react-native";

const Alimentation = () => {
  return (
    <ScrollView className="w-full bg-primary h-full">
      <SafeAreaView className="py-6 px-6">
        <Text className="text-4xl text-start text-white font-rbold -mt-3">
          Alimentation
        </Text>

        <Text className="text-4xl text-start text-white font-rbold mt-8">
          // TODO Add content
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Alimentation;
