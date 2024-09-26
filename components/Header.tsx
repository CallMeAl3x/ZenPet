import { View, Image, TouchableOpacity, BackHandler } from "react-native";
import { icons, images } from "../constants";
import { usePathname, useRouter } from "expo-router";
import { getRedirectPath } from "../constants/router";
import { useNavigationHistory } from "./NavigationProvider";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const redirectPath = getRedirectPath();
  const { history, setHistory, isGoingBack, setIsGoingBack } =
    useNavigationHistory();

  const handleBackPress = () => {
    setIsGoingBack(true);
    if (history.length > 1) {
      const previousUrl = history[history.length - 2];
      router.replace(previousUrl);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    } else {
      router.replace("/accueil");
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBackPress();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [history]);

  const pathname = usePathname();
  const showBackButton = pathname.split("/").length > 2 && redirectPath;

  return (
    <View className="flex justify-center items-center z-50 bg-primary pt-14">
      <View className="flex-row items-center w-full px-4 justify-between">
        {showBackButton ? (
          <TouchableOpacity onPress={handleBackPress} className="flex-1">
            <Image
              source={icons.leftArrow}
              className="w-[12.35px] h-[21px] ml-2"
            />
          </TouchableOpacity>
        ) : (
          <View className="flex-1" />
        )}
        <View className="flex-1 items-center justify-center">
          <Image
            source={images.logoSmall}
            className="w-[53px] h-[43px]"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1"></View>
      </View>
    </View>
  );
};

export default Header;
