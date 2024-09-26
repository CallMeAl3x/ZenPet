import React from "react";
import { Pressable, Text, View } from "react-native";

interface TabItemProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
  notificationCount: number;
  otherStyle?: string;
}

const TabItem: React.FC<TabItemProps> = ({
  title,
  isActive,
  onPress,
  notificationCount,
  otherStyle,
}) => {
  return (
    <Pressable
      className={`flex flex-row items-center relative ${otherStyle}`}
      onPress={onPress}
    >
      <Text
        className={`${
          isActive ? "text-white" : "text-[#A8D5BA]"
        } font-rbold text-lg`}
      >
        {title}
      </Text>
      <Text
        className={`${
          isActive ? "bg-white" : "bg-[#A8D5BA]"
        } font-rbold text-base py-0.5 px-1 rounded-[4px] ml-2.5 mt-1.5 leading-[16px] text-center`}
      >
        {notificationCount}
      </Text>
      {isActive && (
        <View className="absolute top-[135%] h-0.5 bg-white w-full" />
      )}
    </Pressable>
  );
};

export default TabItem;
