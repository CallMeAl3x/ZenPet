import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../../constants";

const PasswordField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-14 px-4 bg-white rounded-2xl border-2 border-black focus:border-black flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-rmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          onChangeText={handleChangeText}
          secureTextEntry={!showPassword}
          {...props}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? icons.eyeHide : icons.eye}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default PasswordField;
