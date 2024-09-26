import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";

interface ProductCardProps {
  name: string;
  image: string;
  otherStyles?: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
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
        className="h-24 max-w-[112px] min-w-[105px] overflow-hidden rounded-[8px]"
        source={image}
        resizeMode="contain"
      />
      <Text className="text-white mt-2 text-start">{name}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
