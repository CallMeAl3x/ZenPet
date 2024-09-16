import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import GoBackButton from "../../../components/GoBackButton";
import TextField from "../../../components/fields/TextField";
import DateTimeField from "../../../components/fields/DateTimeField";
import { getCurrentUser, updateUser } from "../../../lib/appwrite";
import Toast from "react-native-toast-message";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setFormData({
          userId: user.$id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          username: user.username || "",
          birthDate: user.birthdayDate || "",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Failed to load user data. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const updatedUser = await updateUser({
        userId: formData.userId,
        email: formData.email,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthdayDate: formData.birthDate,
      });

      if (updatedUser) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Vos informations ont bien été mise à jour !",
        });
      } else {
        throw new Error("Error lors de la mise à jour des informations");
      }
    } catch (error) {
      console.error("Error lors de la mise à jour de", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          error.message ||
          "Vos informations n'ont pas pu être mise à jour réessayez plus tard",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-5">
        <View className="mt-1">
          <GoBackButton link={"/compte"} />
          <View className="mt-4">
            <Text className="text-white text-xl font-rsemibold">
              Informations personnelles
            </Text>
          </View>
        </View>

        <View className="mt-6">
          <Text className="font-rsemibold text-lg text-white mb-1">Prénom</Text>
          <TextField
            placeholder=""
            value={formData.firstName}
            handleChangeText={(text) => handleChange("firstName", text)}
            error={errors.firstName}
            otherStyles="mt-1"
          />
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Nom
          </Text>
          <TextField
            placeholder=""
            value={formData.lastName}
            handleChangeText={(text) => handleChange("lastName", text)}
            error={errors.lastName}
            otherStyles="mt-3"
          />
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Email
          </Text>
          <TextField
            placeholder=""
            value={formData.email}
            handleChangeText={(text) => handleChange("email", text)}
            error={errors.email}
            otherStyles="mt-3"
          />
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Date de naissance
          </Text>
          <DateTimeField
            placeholder=""
            value={formData.birthDate}
            handleChangeText={(date) => handleChange("birthDate", date)}
            error={errors.birthDate}
            otherStyles="mt-3"
            checkAdult={true}
          />
        </View>

        <TouchableOpacity
          className={`py-4 rounded-full mt-8 mb-4 ${
            isLoading ? "bg-gray-400" : "bg-white"
          }`}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text className="text-primary text-center font-rbold">
            {isLoading ? "Updating..." : "Update Information"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;
