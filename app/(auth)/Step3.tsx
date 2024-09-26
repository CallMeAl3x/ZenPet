import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { CustomButton } from "../../components";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { addPet, getCurrentUser } from "../../lib/appwrite";
import NumberField from "../../components/fields/NumberField";
import TextField from "../../components/fields/TextField";
import DateTimeField from "../../components/fields/DateTimeField";
import { useRouter } from "expo-router";

const Step3 = ({ nextStep }: { nextStep: () => void }) => {
  const [form, setForm] = useState({
    type: "",
    name: "",
    weight: "",
    birthdayDate: "",
    trait: "",
  });
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const router = useRouter();

  const { user, setIsLogged } = useGlobalContext();

  const skipStep = async () => {
    setIsLogged(true); // Set isLogged to true after completing Step 3
    router.replace("/accueil");
  };

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    setForm({ ...form, type });
  };

  const handleTraitSelection = (trait: string) => {
    let newTraits: string[];
    if (selectedTraits.includes(trait)) {
      newTraits = selectedTraits.filter((t) => t !== trait);
    } else {
      newTraits = [...selectedTraits, trait];
    }
    setSelectedTraits(newTraits);
    setForm({ ...form, trait: newTraits.join(", ") }); // Convertir le tableau en chaîne
  };

  const handleSubmit = async () => {
    if (!form.type || !form.name || !form.weight || !form.birthdayDate) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!user) {
      Alert.alert(
        "Erreur",
        "Vous devez être connecté pour ajouter un animal de compagnie."
      );
      return;
    }

    try {
      await addPet(form, user.$id);
      Alert.alert(
        "Succès",
        "Votre animal de compagnie a été ajouté avec succès !"
      );
      setIsLogged(true); // Set isLogged to true after completing Step 3
      router.replace("/accueil"); // Redirect to home after completing Step 3
    } catch (error) {
      Alert.alert("Erreur", (error as Error).message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#004D40] px-5 pb-20">
      <Text className="text-2xl font-psemibold text-white mt-8">
        Souhaiteriez-vous ajoutez des compagnons ? {user?.username}
      </Text>

      <Text className="text-base text-white mt-3 font-rmedium">
        ZenPet est pensée pour être une expérience personnelle unique. Pour
        tirer le meilleur parti de notre application, nous vous recommandons
        vivement d'inscrire dès maintenant vos compagnons.
      </Text>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          onPress={() => handleTypeSelection("chien")}
          className={`bg-white p-3 rounded-2xl flex items-center justify-center px-7 ${
            selectedType === "chien" ? "border-[1.5px] border-secondary" : ""
          }`}
        >
          <Image source={icons.dog} className="w-[30px] h-[30px]" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTypeSelection("cat")}
          className={`bg-white p-3 rounded-2xl flex items-center justify-center px-7 ${
            selectedType === "cat" ? "border-[1.5px] border-secondary" : ""
          }`}
        >
          <Image source={icons.cat} className="w-[30px] h-[30px]" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTypeSelection("other")}
          className={`bg-white p-3 rounded-2xl flex items-center justify-center px-7 ${
            selectedType === "other" ? "border-[1.5px] border-secondary" : ""
          }`}
        >
          <Text className="text-black font-rmedium">Autres</Text>
        </TouchableOpacity>
      </View>

      <TextField
        title="Nom"
        value={form.name}
        handleChangeText={(e) => setForm({ ...form, name: e })}
        placeholder="Nom"
        otherStyles="mt-4"
      />

      <NumberField
        value={form.weight}
        handleChangeText={(newWeight) => {
          setForm({
            ...form,
            weight: newWeight,
          });
        }}
        placeholder="Poids"
        otherStyles="mt-4"
        keyboardType="numeric"
      />

      <DateTimeField
        title="Date de naissance"
        value={form.birthdayDate}
        handleChangeText={(e) => setForm({ ...form, birthdayDate: e })}
        placeholder="Date de naissance"
        otherStyles={"mt-4"}
      />

      <View className="flex-row justify-between mt-4">
        {["Solitaire", "Sociable", "Tolérant"].map((trait) => (
          <TouchableOpacity
            key={trait}
            onPress={() => handleTraitSelection(trait)}
            className={`bg-white p-3 rounded-lg ${
              selectedTraits.includes(trait) ? "bg-secondary" : ""
            }`}
          >
            <Text
              className={`${
                selectedTraits.includes(trait) ? "text-white" : "text-black"
              }`}
            >
              {trait}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex mt-4 space-y-4">
        <CustomButton
          title="Passer cette étape"
          handlePress={skipStep}
          containerStyles="bg-white text-black py-3 rounded-lg"
          textStyles="text-center"
        />

        <CustomButton
          title="Valider et continuer"
          handlePress={handleSubmit}
          containerStyles="bg-[#00796B] py-3 rounded-lg"
          textStyles="text-white text-center"
        />
      </View>
    </ScrollView>
  );
};

export default Step3;
