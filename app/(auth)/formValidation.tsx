export const validateStep1 = (form: {
  firstName?: string;
  lastName?: string;
  birthdayDate?: string;
  username?: string;
  email: any;
  password?: string;
  confirmPassword?: string;
}) => {
  const errors = {};
  if (!form.email) {
    errors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "L'adresse email n'est pas valide";
  }
  return errors;
};

export const validateStep2 = (form: {
  firstName: any;
  lastName: any;
  birthdayDate: any;
  username: any;
  email?: string;
  password: any;
  confirmPassword: any;
}) => {
  const errors = {};
  if (!form.firstName) errors.firstName = "Le prénom est requis";
  if (!form.lastName) errors.lastName = "Le nom est requis";
  if (!form.birthdayDate) {
    errors.birthdayDate = "La date de naissance est requise";
  } else {
    // Vérifier si la date est valide et si l'utilisateur a plus de 16 ans et 1 jour
    const birthDate = new Date(form.birthdayDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();
    if (age < 16 || (age === 16 && (m < 0 || (m === 0 && d < 1)))) {
      errors.birthdayDate =
        "Vous devez avoir au moins 16 ans et 1 jour pour vous inscrire";
    }
  }
  if (!form.username) errors.username = "Le nom d'utilisateur est requis";
  if (!form.password) {
    errors.password = "Le mot de passe est requis";
  } else if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(form.password)) {
    errors.password =
      "Le mot de passe doit contenir au moins 6 caractères, dont 1 majuscule et 1 chiffre";
  }
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas";
  }
  return errors;
};
