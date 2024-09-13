import { Text, ScrollView } from "react-native";
import { CustomButton } from "../../components";
import TextField from "../../components/fields/TextField";
import DateTimeField from "../../components/fields/DateTimeField";
import PasswordField from "../../components/fields/PasswordField";

const Step2 = ({ form, setForm, errors, isSubmitting, prevStep, submit }) => {
  return (
    <ScrollView className="flex-1 bg-primary px-5">
      <Text className="text-2xl font-psemibold text-white mt-6 mb-4">
        Inscription
      </Text>

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
        secureTextEntry
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
