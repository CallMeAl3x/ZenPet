import { View, Image } from "react-native";
import { images } from "../constants";

const Header = () => {
  return (
    <View
      className="flex justify-center items-center z-50 bg-primary"
      style={{ paddingTop: 65 }}
    >
      <Image
        source={images.logoSmall}
        className="w-[53px] h-[43]"
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;
