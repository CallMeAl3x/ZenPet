type Pet = {
  $id: string;
  name: string;
  type: string;
  weight: number;
  birthdayDate: string; // Assuming ISO string
  trait: string;
  image?: string; // Optionally if the pet has an image
};

type PetForm = {
  type: string;
  name: string;
  weight: string; // Keep it as a string for form handling
  birthdayDate: string;
  trait: string;
};
