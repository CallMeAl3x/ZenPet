import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons, images } from "../constants";

interface MessageCardProps {
  avatar: string;
  otherStyles?: string;
  text: string;
  link: string;
  user: string;
}

const MessageCard: React.FC<MessageCardProps> = ({
  user,
  avatar,
  text,
  otherStyles,
  link,
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace("/services" + link)}
      className={`rounded-[8px] flex flex-row items-center space-x-3.5 p-2.5 ${otherStyles}`}
    >
      <Image
        source={images.thumbnail}
        className="h-10 w-10 rounded-full"
      ></Image>
      <View>
        <Text className="text-white text-start font-rsemibold text-base">
          {user}
        </Text>
        <Text className="text-white/50 text-start font-rmedium text-sm">
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
