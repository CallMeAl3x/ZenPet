import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";

interface ServiceCardProps {
  name: string;
  image: string;
  otherStyles?: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  image,
  otherStyles,
  link,
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace("/services" + link)}
      className={`rounded-[20px] ${otherStyles}`}
    >
      <ImageBackground
        className="h-24 w-[144px]"
        source={image}
        resizeMode="cover"
      />
      <Text className="text-white text-start">{name}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;
