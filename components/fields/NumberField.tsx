import React from "react";
import { View, Text, TextInput } from "react-native";
import { INumberField } from "../../types/INumberField";

const NumberField: React.FC<INumberField> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  error,
}) => {
  const handleTextChange = (text: string) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, "");
    // Call the provided handleChangeText function with numeric value or "0" if empty
    handleChangeText(numericValue === "" ? "0" : numericValue);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && <Text className="text-lg font-semibold">{title}</Text>}
      <View className="w-full h-14 px-4 bg-white rounded-2xl border-2 border-black focus:border-black flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-rmedium text-base"
          value={Number(value) === 0 ? "" : value.toString()} // Display empty string if value is 0
          placeholder={placeholder}
          placeholderTextColor="#000000"
          onChangeText={handleTextChange}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default NumberField;
