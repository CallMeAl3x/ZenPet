import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";

const GoBackButton = ({ link }) => {
  const router = useRouter();

  return (
    <View className="mt-2">
      <TouchableOpacity onPress={() => router.replace(link)}>
        <Image source={icons.leftArrow} className="w-[12.35] h-[21px]" />
      </TouchableOpacity>
    </View>
  );
};

export default GoBackButton;
