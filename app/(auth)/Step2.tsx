import { Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { CustomButton } from "../../components";
import * as ImagePicker from "expo-image-picker";
import DateTimeField from "../../components/fields/DateTimeField";
import PasswordField from "../../components/fields/PasswordField";
import Toast from "react-native-toast-message";
import { icons } from "../../constants";
import TextField from "../../components/fields/TextField";

interface Step2Props {
  form: any;
  setForm: any;
  errors: any;
  isSubmitting: boolean;
  prevStep: () => void;
  submit: () => void;
}

const Step2 = ({
  form,
  setForm,
  errors,
  isSubmitting,
  prevStep,
  submit,
}: Step2Props) => {
  const avatarUri = form.avatar || null;

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
      });

      if (!result.canceled) {
        setForm((prevData: any) => ({
          ...prevData,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Échec de la sélection de l'image. Veuillez réessayer.",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary px-5">
      <Text className="text-2xl font-psemibold text-white mt-6 mb-4">
        Inscription
      </Text>

      <TouchableOpacity onPress={openPicker}>
        <Image
          source={form.avatar ? { uri: form.avatar } : icons.avatar}
          className="w-24 h-24 rounded-full self-center mb-4"
          resizeMode="cover"
        />
        <Text className="text-center text-white text-base font-rsemibold mb-4">
          {avatarUri ? "Modifier l'avatar" : "Ajouter un avatar"}
        </Text>
      </TouchableOpacity>

      <TextField
        title="Prénom"
        value={form.firstName}
        handleChangeText={(e) => setForm({ ...form, firstName: e })}
        placeholder="Prénom"
        error={errors.firstName}
      />

      <TextField
        title="Nom"
        value={form.lastName}
        handleChangeText={(e) => setForm({ ...form, lastName: e })}
        placeholder="Nom"
        otherStyles={"mt-4"}
        error={errors.lastName}
      />

      <Text className="text-white text-xs mt-1 mb-4">
        Ton nom et prénom doivent être enregistrés tels qu'ils sont inscrits sur
        ta carte d'identité
      </Text>

      <TextField
        title="Username"
        value={form.username}
        handleChangeText={(e) => setForm({ ...form, username: e })}
        placeholder="Surnom"
        otherStyles={"mt-4"}
        error={errors.username}
      />

      <Text className="text-white text-xs mt-1 mb-4">
        Comment devrions nous vous appellez ?
      </Text>

      <DateTimeField
        title="Date de naissance"
        value={form.birthdayDate}
        handleChangeText={(e) => setForm({ ...form, birthdayDate: e })}
        placeholder="Date de naissance"
        error={errors.birthdayDate}
      />

      <Text className="text-white text-xs mt-1 mb-4">
        Tu dois avoir plus de 16 ans pour utiliser ZenPet
      </Text>

      <PasswordField
        title="Mot de passe"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        placeholder="Mot de passe"
        error={errors.password}
      />

      <Text className="text-white text-xs mt-1 mb-4">
        Le mot de passe doit contenir au moins 6 caractères dont 1 majuscule et
        1 chiffre
      </Text>

      <TextField
        title="Confirmer mon mot de passe"
        value={form.confirmPassword}
        handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
        placeholder="Confirmer mon mot de passe"
        error={errors.confirmPassword}
      />

      <Text className="text-white text-sm font-rmedium mt-8 mb-4">
        En cliquant sur accepter et continuer, j'accepte les conditions
        d'utilisation et la politique de confidentialité
      </Text>

      <CustomButton
        title="Accepter et continuer"
        handlePress={() => {
          submit();
        }}
        containerStyles="bg-[#00796B] py-3 rounded-lg"
        textStyles="text-white text-center"
        isLoading={isSubmitting}
      />

      <CustomButton
        title="Retourner en arrière"
        handlePress={prevStep}
        containerStyles="bg-[#fffff] py-3 rounded-lg"
        textStyles="text-white text-center"
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

export default Step2;
