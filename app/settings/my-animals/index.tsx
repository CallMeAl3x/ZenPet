import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import {
  getUserPets,
  addPet,
  updatePet,
  deletePet,
} from "../../../lib/appwrite";
import { icons } from "../../../constants";
import TextField from "../../../components/fields/TextField";
import DateTimeField from "../../../components/fields/DateTimeField";
import NumberField from "../../../components/fields/NumberField";

const MyAnimals = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState<PetForm>({
    type: "",
    name: "",
    weight: "",
    birthdayDate: "",
    trait: "",
  });

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string>();
  const traits = ["Solitaire", "Sociable", "Tolérant"];

  const { user } = useGlobalContext();

  useEffect(() => {
    fetchPets();
  }, [user]);

  const fetchPets = async () => {
    if (user) {
      try {
        const userPets: Pet[] = await getUserPets(user.$id);
        setPets(userPets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderPetItem = ({ item }: { item: Pet }) => (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-40 rounded-md mb-2"
        />
      )}
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-600">Type : {item.type}</Text>
      <Text className="text-gray-600">Poids : {item.weight} kg</Text>
      <Text className="text-gray-600">Trait : {item.trait}</Text>
      <Text className="text-gray-600">
        Date de naissance: {new Date(item.birthdayDate).toLocaleDateString()}
      </Text>
      <TouchableOpacity
        onPress={() => handleEditPet(item)}
        className="bg-secondary py-2 px-4 rounded-lg mt-2"
      >
        <Text className="text-white font-bold text-center">Modifier</Text>
      </TouchableOpacity>
    </View>
  );

  const handleEditPet = (pet: Pet) => {
    setForm({
      type: pet.type,
      name: pet.name,
      weight: pet.weight.toString(),
      birthdayDate: new Date(pet.birthdayDate).toISOString(),
      trait: pet.trait,
    });
    setSelectedType(pet.type);
    setSelectedTraits(pet.trait.split(", "));
    setEditingPetId(pet.$id);
    setModalVisible(true);
  };
  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    setForm({ ...form, type });
  };

  const handleDeletePet = async () => {
    if (!editingPetId) return;
    try {
      await deletePet(editingPetId);
      Alert.alert("Succès", "Votre animal de compagnie a été supprimé !");
      setModalVisible(false);
      fetchPets();
      resetForm();
    } catch (error) {
      Alert.alert("Erreur", (error as Error).message);
    }
  };

  const handleTraitSelection = (trait: string) => {
    let newTraits: string[];
    if (selectedTraits.includes(trait)) {
      newTraits = selectedTraits.filter((t) => t !== trait);
    } else {
      newTraits = [...selectedTraits, trait];
    }
    setSelectedTraits(newTraits);
    setForm({ ...form, trait: newTraits.join(", ") });
  };

  const handleSubmit = async () => {
    if (!form.type || !form.name || !form.weight || !form.birthdayDate) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingPetId) {
        await updatePet(form, editingPetId, user.$id);
        Alert.alert(
          "Succès",
          "Votre animal de compagnie a été mis à jour avec succès !"
        );
      } else {
        await addPet(form, user.$id);
        Alert.alert(
          "Succès",
          "Votre animal de compagnie a été ajouté avec succès !"
        );
      }
      setModalVisible(false);
      fetchPets(); // Refresh the pet list
      resetForm();
    } catch (error) {
      Alert.alert("Erreur", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      type: "",
      name: "",
      weight: "",
      birthdayDate: "",
      trait: "",
    });
    setSelectedType("null");
    setSelectedTraits([]);
    setEditingPetId(undefined);
  };

  return (
    <SafeAreaView className="bg-primary h-screen">
      <View className="px-5 mt-6">
        <Text className="text-2xl font-bold text-white mb-4 mt-6">
          Mes animaux
        </Text>
        {pets.length === 0 ? (
          <View className="items-center mt-8">
            <Text className="text-white mb-4">
              Vous n'avez pas encore d'animaux
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="bg-secondary py-2 px-4 rounded-lg"
            >
              <Text className="text-white font-bold">Ajouter un animal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={pets}
            renderItem={renderPetItem}
            keyExtractor={(item) => item.$id}
            className="w-full"
            ListFooterComponent={
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setModalVisible(true);
                }}
                className="bg-secondary py-2 px-4 rounded-lg mt-4 mb-8"
              >
                <Text className="text-white font-bold text-center">
                  Ajouter un animal
                </Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetForm();
        }}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white rounded-t-3xl p-5 h-5/6">
            <ScrollView>
              <Text className="text-2xl font-semibold mb-4">
                {editingPetId
                  ? "Modifier l'animal"
                  : "Ajouter un animal de compagnie"}
              </Text>

              <View className="flex-row justify-between mb-4">
                <TouchableOpacity
                  onPress={() => handleTypeSelection("chien")}
                  className={`bg-gray-200 p-3 rounded-2xl flex items-center justify-center px-7 ${
                    selectedType === "chien" ? "border-2 border-secondary" : ""
                  }`}
                >
                  <Image source={icons.dog} className="w-[30px] h-[30px]" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTypeSelection("chat")}
                  className={`bg-gray-200 p-3 rounded-2xl flex items-center justify-center px-7 ${
                    selectedType === "chat" ? "border-2 border-secondary" : ""
                  }`}
                >
                  <Image source={icons.cat} className="w-[30px] h-[30px]" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTypeSelection("other")}
                  className={`bg-gray-200 p-3 rounded-2xl flex items-center justify-center px-7 ${
                    selectedType === "other" ? "border-2 border-secondary" : ""
                  }`}
                >
                  <Text className="text-black font-medium">Autres</Text>
                </TouchableOpacity>
              </View>

              <View className="mb-4">
                <Text className="text-black font-medium mb-2">Nom</Text>
                <TextField
                  value={form.name}
                  placeholder="Nom de l'animal"
                  handleChangeText={(text) => setForm({ ...form, name: text })}
                />
              </View>

              <View className="mb-4">
                <Text className="text-black font-medium mb-2">Poids (kg)</Text>
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
              </View>

              <View className="mb-4">
                <Text className="text-black font-medium mb-2">
                  Date de naissance
                </Text>
                <DateTimeField
                  value={form.birthdayDate}
                  placeholder="Sélectionner une date"
                  handleChangeText={(date) =>
                    setForm({ ...form, birthdayDate: date })
                  }
                />
              </View>

              <View className="mb-4">
                <Text className="text-black font-medium mb-2">
                  Trait de caractère
                </Text>
                <View className="flex-row justify-between">
                  {traits.map((trait) => (
                    <TouchableOpacity
                      key={trait}
                      onPress={() => handleTraitSelection(trait)}
                      className={`bg-gray-200 p-3 rounded-lg ${
                        selectedTraits.includes(trait) ? "bg-secondary" : ""
                      }`}
                    >
                      <Text
                        className={`${
                          selectedTraits.includes(trait)
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {trait}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                className={`bg-secondary py-3 rounded-lg ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                <Text className="text-white font-bold text-center">
                  {isSubmitting
                    ? "Traitement en cours..."
                    : editingPetId
                    ? "Mettre \u00E0 jour l'animal"
                    : "Ajouter l'animal"}
                </Text>
              </TouchableOpacity>

              {editingPetId && (
                <TouchableOpacity
                  onPress={handleDeletePet}
                  disabled={isSubmitting}
                  className={`bg-red-600 py-3 rounded-lg mt-4 ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  <Text className="text-white font-bold text-center">
                    {isSubmitting
                      ? "Traitement en cours..."
                      : "Supprimer l'animal"}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
                className="mt-4 py-3 rounded-lg border border-gray-300"
              >
                <Text className="text-black font-bold text-center">
                  Annuler
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyAnimals;
