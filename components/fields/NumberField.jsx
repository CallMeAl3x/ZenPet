import React from "react";
import { View, Text, TextInput } from "react-native";

const NumberField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  error,
  ...props
}) => {
  const handleTextChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, "");
    // Call the provided handleChangeText function with numeric value or 0 if empty
    handleChangeText(numericValue === "" ? 0 : parseInt(numericValue, 10));
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && <Text className="text-lg font-semibold">{title}</Text>}
      <View className="w-full h-14 px-4 bg-white rounded-2xl border-2 border-black focus:border-black flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-rmedium text-base"
          value={value === 0 ? "" : value.toString()} // Display empty string if value is 0
          placeholder={placeholder}
          placeholderTextColor="#000000"
          onChangeText={handleTextChange}
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default NumberField;
