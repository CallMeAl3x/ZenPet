import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, ImageBackground } from "react-native";
import { images } from "../../constants";
import { CustomButton } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import TextField from "../../components/fields/TextField";
import PasswordField from "../../components/fields/PasswordField";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/alimentation");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={images.backgroundRegister0}
      className="w-full h-full"
    >
      <SafeAreaView className="h-full">
        <View className="w-full flex h-full px-8 my-3 font-rregular">
          <Text className="text-4xl text-white mt-6 font-rbold">
            Se connecter à ZenPet
          </Text>

          <View className="flex flex-row gap-2 mt-3">
            <View className="h-2 w-5 bg-white rounded-[37px]"></View>
            <View className="h-2 w-2 bg-white opacity-[0.65] rounded-[37px]"></View>
            <View className="h-2 w-2 bg-white opacity-[0.65] rounded-[37px]"></View>
          </View>

          <TextField
            title="Email"
            placeholder={"Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <PasswordField
            title="Password"
            placeholder={"Mot de passe"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Se connecter"
            handlePress={submit}
            containerStyles=""
            style={{ marginTop: 40 }}
            isLoading={isSubmitting}
            textStyles={"text-white"}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white font-rmedium">
              Pas encore de compte ?
            </Text>
            <Link href="/sign-up" className="text-lg font-rbold text-white">
              S'inscrire
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
