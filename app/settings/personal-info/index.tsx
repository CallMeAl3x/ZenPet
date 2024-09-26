import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import TextField from "../../../components/fields/TextField";
import DateTimeField from "../../../components/fields/DateTimeField";
import { getCurrentUser, updateUser } from "../../../lib/appwrite";
import Toast from "react-native-toast-message";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from "expo-router";

type FormData = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthDate: string;
  avatar: string;
};

type Errors = {
  [key: string]: string | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  birthDate?: string;
  avatar?: string;
};

const formData: FormData = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  birthDate: "",
  avatar: "",
};

const PersonalInfo = () => {
  const newErrors: Errors = {};

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    birthDate: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const { user, setUser } = useGlobalContext();

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
          avatar: user.avatar || "",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Failed to load user data. Please try again.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    if (newErrors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    const newErrors: Errors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
    if (!formData.avatar) newErrors.avatar = "Avatar is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const updatedUser = await updateUser({
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        birthdayDate: formData.birthDate,
        avatar: formData.avatar,
      });

      if (updatedUser) {
        const freshUser = await getCurrentUser();
        setUser(freshUser);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Vos informations ont bien été mise à jour !",
        });
        router.replace("/compte");
      } else {
        throw new Error("Error lors de la mise à jour des informations");
      }
    } catch (error) {
      console.error("Error lors de la mise à jour de", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          (error as Error).message ||
          "Vos informations n'ont pas pu être mise à jour réessayez plus tard",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openPicker = async () => {
    try {
      // Demander la permission d'accéder à la galerie
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Permission d'accès à la galerie refusée.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 1,
        legacy: true,
      });

      if (!result.canceled) {
        setFormData((prevData: any) => ({
          ...prevData,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Échec de la sélection du document. Veuillez réessayer.",
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-5">
        <View className="mt-1">
          <View className="mt-4">
            <Text className="text-white text-xl font-rsemibold">
              Informations personnelles
            </Text>
          </View>
        </View>

        <View className="mt-6">
          <Text className="font-rsemibold text-center text-lg text-white mb-3 mt-3">
            Photo de profil
          </Text>
          <TouchableOpacity onPress={() => openPicker()}>
            <Image
              source={{ uri: formData.avatar || user?.avatar }}
              resizeMode="cover"
              className="w-24 h-24 rounded-full ml-auto mr-auto"
            />
          </TouchableOpacity>
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Surnom
          </Text>
          <TextField
            placeholder=""
            value={formData.username}
            handleChangeText={(text) => handleChange("username", text)}
            error={newErrors.username}
            otherStyles="mb-3"
          />
          <Text className="font-rsemibold text-lg text-white mb-1">Prénom</Text>
          <TextField
            placeholder=""
            value={formData.firstName}
            handleChangeText={(text) => handleChange("firstName", text)}
            error={newErrors.firstName}
            otherStyles="mt-1"
          />
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Nom
          </Text>
          <TextField
            placeholder=""
            value={formData.lastName}
            handleChangeText={(text) => handleChange("lastName", text)}
            error={newErrors.lastName}
            otherStyles="mt-3"
          />
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Email
          </Text>
          <TextField
            placeholder=""
            value={formData.email}
            handleChangeText={(text) => handleChange("email", text)}
            error={newErrors.email}
            otherStyles="mt-3"
          />
          <Text className="font-rsemibold text-lg text-white mb-1 mt-3">
            Date de naissance
          </Text>
          <DateTimeField
            placeholder=""
            value={formData.birthDate}
            handleChangeText={(date) => handleChange("birthDate", date)}
            error={newErrors.birthDate}
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
            {isLoading ? "Mise à jour..." : "Mettre à jour mes informations"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;
