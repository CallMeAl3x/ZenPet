import { View, Text, SafeAreaView } from "react-native";
import GoBackButton from "../../../components/GoBackButton";

const VisiteADomicile = () => {
  return (
    <SafeAreaView className="bg-primary h-screen px-5">
      <View className="ml-3 mt-1">
        <GoBackButton link={"/services"} />
        <View className="mt-4">
          <Text className="text-white text-xl font-rsemibold">
            Visite à domicile
          </Text>
          <Text className="text-4xl font-rbold mt-6 text-white">TO DO //</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VisiteADomicile;
