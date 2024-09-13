import React from "react";
import { View, Text, TextInput } from "react-native";

const TextField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  error,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-14 px-4 bg-white rounded-2xl border-2 border-black focus:border-black flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-rmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default TextField;
