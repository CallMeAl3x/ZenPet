import { useRouter } from "expo-router";
import { icons } from "../constants";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { IServiceOption } from "../types/IServiceOption";

const ServiceOption: React.FC<IServiceOption> = ({
  texte,
  background,
  style,
  link,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className={`mt-4 ${style} rounded-[8px] overflow-hidden`}
      onPress={() => router.replace("/services" + link)}
    >
      <ImageBackground
        source={background}
        className="w-full h-[75px] opacity-90"
        imageStyle={{ resizeMode: "cover" }}
      >
        <View className="w-full h-full flex justify-between items-center flex-row p-4">
          <Text className="text-xl text-white font-rbold flex-1 text-center ml-1.5">
            {texte}
          </Text>
          <Image source={icons.rightArrow} className="h-[17px] w-2.5 mr-1.5" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ServiceOption;
