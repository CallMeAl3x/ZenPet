import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { icons } from "../../constants";
import { IDateTimeField } from "../../app/(types)/IDateTimeField";

const DateTimeField: React.FC<IDateTimeField> = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  error,
  checkAdult,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [adultError, setAdultError] = useState(false); // State to manage adult check error

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    if (checkAdult && !isAdult(date)) {
      setAdultError(true);
    } else {
      setAdultError(false);
      handleChangeText(date.toISOString()); // Conserve le format ISO pour la base de données
    }
  };

  const formatDateForDisplay = (dateStr: string | number | Date) => {
    if (!dateStr) return "Invalid Date"; // Handle empty or invalid date strings

    const date = new Date(dateStr); // Convert the string to a Date object
    if (isNaN(date.getTime())) return "Invalid Date"; // Check if the date is valid

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Display the date in DD/MM/YYYY format
  };

  const isAdult = (date: string | number | Date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-14 px-4 bg-white rounded-2xl border-2 border-black focus:border-black flex flex-row items-center">
        <TouchableOpacity
          className="flex-1 justify-center"
          onPress={showDatePicker}
        >
          <Text className="text-black font-rmedium text-base">
            {value ? formatDateForDisplay(value) : placeholder}
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
      {adultError && (
        <Text className="text-red-500 text-sm">
          Tu dois avoir au minimum 18 ans
        </Text>
      )}
      <DateTimePickerModal
        maximumDate={new Date()}
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
