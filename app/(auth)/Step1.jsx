import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { CustomButton } from "../../components";
import { Link, router } from "expo-router";
import { checkEmailExists } from "../../lib/appwrite";
import TextField from "../../components/fields/TextField";

const Step1 = ({ form, setForm, errors, isSubmitting, nextStep }) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleNextStep = async () => {
    if (!form.email) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email");
      return;
    }

    setIsCheckingEmail(true);
    try {
      const emailExists = await checkEmailExists(form.email.toLowerCase());
      console.log("Email exists:", emailExists);

      if (emailExists) {
        Alert.alert(
          "Utilisateur existant",
          "Un compte avec cet email existe déjà. Voulez-vous vous connecter ?",
          [
            {
              text: "Annuler",
              style: "cancel",
            },
            {
              text: "Se connecter",
              onPress: () => {
                console.log("Redirecting to sign-in");
                setTimeout(() => {
                  router.replace("/sign-in");
                }, 100);
              },
            },
          ]
        );
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Error checking email:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la vérification de l'email: " +
          error.message
      );
    } finally {
      setIsCheckingEmail(false);
    }
  };

  return (
    <View className="w-full flex justify-center h-full px-5 my-6">
      <Text className="text-2xl font-semibold text-white mt-6 font-psemibold">
        Quelle est ton adresse mail ?
      </Text>

      <TextField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        otherStyles="mt-7"
        keyboardType="email-address"
        placeholder={"Adresse mail"}
        error={errors.email}
      />

      <CustomButton
        title="Continuer"
        handlePress={handleNextStep}
        containerStyles=""
        style={{ marginTop: 40 }}
        isLoading={isSubmitting || isCheckingEmail}
        textStyles={"text-white"}
      />

      <View className="flex justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-white font-rmedium">
          Tu as déjà un compte ?
        </Text>
        <Link href="/sign-in" className="text-lg font-rbold text-white">
          Se connecter
        </Link>
      </View>
    </View>
  );
};

export default Step1;
