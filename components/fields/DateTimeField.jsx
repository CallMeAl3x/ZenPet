import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { icons } from "../../constants";

const DateTimeField = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  error,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    handleChangeText(formatDate(date)); // Format as MM/DD/YYYY
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-14 px-4 bg-white rounded-2xl border-2 border-black focus:border-black flex flex-row items-center">
        <TouchableOpacity
          className="flex-1 justify-center"
          onPress={showDatePicker}
        >
          <Text className="text-black font-rmedium text-base">
            {value || placeholder}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker}>
          <Image
            source={icons.calendar}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default DateTimeField;
