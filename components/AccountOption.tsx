import { useRouter } from "expo-router";
import { icons } from "../constants";
import { View, Image, Text, TouchableOpacity } from "react-native";

interface AccountOptionProps {
  texte: string;
  icon: string;
  style?: string;
  link?: string;
}

const AccountOption = ({ texte, icon, style, link }: AccountOptionProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.replace("/settings/" + link)}>
      <View className="flex flex-col w-full">
        <View className={`flex mt-3 flex-row items-center w-full ${style}`}>
          <Image source={icon} className="h-5 w-5" />
          <Text className="font-rmedium text-base text-white ml-2.5">
            {texte}
          </Text>
          <Image source={icons.rightArrow} className="h-[17px] w-2.5 ml-auto" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccountOption;
