import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ICustomButton } from "../types/ICustomButton";

const CustomButton: React.FC<ICustomButton> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  image,
  style,
}) => {
  return (
    <LinearGradient
      colors={["#3D8361", "#2F775D", "#1F725F", "#1C6758"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[{ borderRadius: 8, opacity: isLoading ? 0.5 : 1 }, style]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`rounded-[8px] min-h-[47px] px-4 py-3 ${containerStyles}`}
        disabled={isLoading}
      >
        <View className="flex-row items-center justify-between">
          <View className="w-5">
            {image && (
              <Image source={image} className="w-5 h-5" resizeMode="contain" />
            )}
          </View>
          <View className="flex-1 items-center">
            <Text className={`font-rbold text-base ${textStyles}`}>
              {title}
            </Text>
          </View>
          <View className="w-5">
            {isLoading && (
              <ActivityIndicator
                animating={isLoading}
                color="#fff"
                size="small"
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomButton;
