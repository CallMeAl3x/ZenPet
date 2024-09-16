import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: process.env.APPWRITE_PLATFORM_ENDPOINT,
  projectId: process.env.APPWRITE_PROJECT_ID,
  storageId: process.env.APPWRITE_STORAGE_ID,
  databaseId: process.env.APPWRITE_DATABASE_ID,
  userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
  petsCollectionId: process.env.APPWRITE_PETS_COLLECTION_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser({
  email,
  password,
  username,
  firstName,
  lastName,
  birthdayDate,
}) {
  try {
    // Create account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create account");

    // Generate avatar URL
    const avatarUrl = avatars.getInitials(username);

    // Sign in the user
    await signIn(email, password);

    // Create user document in database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        birthdayDate: birthdayDate,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message || "Failed to create user");
  }
}

export async function updateUser({
  userId,
  email,
  username,
  firstName,
  lastName,
  birthdayDate,
  avatar,
}) {
  try {
    // Update user document in database
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        birthdayDate: birthdayDate,
        avatar: avatar,
      }
    );

    if (!updatedUser) throw new Error("Failed to update user");

    return updatedUser;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw new Error(error.message || "Failed to update user");
  }
}

export async function checkEmailExists(email) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", email)]
    );
    console.log("Checking email:", email, response);

    // Si des documents sont trouvés, l'email existe déjà
    return response.documents.length > 0;
  } catch (error) {
    console.error("Error checking email in database:", error);
    throw error;
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Add a pet to an user
export async function addPet(form, userId) {
  try {
    // Supposons que l'image a déjà été uploadée et que nous avons son URL
    const imageUrl = form.image; // Assurez-vous que ce champ existe dans votre formulaire

    const newPet = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.petsCollectionId,
      ID.unique(),
      {
        creator: userId, // Ceci crée la relation avec l'utilisateur créateur
        image: imageUrl,
        type: form.type,
        name: form.name,
        weight: form.weight,
        birthdayDate: form.birthdayDate, // Convertit en objet Date si ce n'est pas déjà fait
        trait: form.trait, // Supposons que c'est une seule chaîne, pas un tableau
      }
    );

    return newPet;
  } catch (error) {
    console.error("Erreur lors de la création de l'animal :", error);
    throw new Error("Impossible de créer l'animal de compagnie");
  }
}

// Add this function to your existing Appwrite service file

export async function updatePet(form, petId, userId) {
  try {
    const updatedPet = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.petsCollectionId,
      petId,
      {
        creator: userId,
        type: form.type,
        name: form.name,
        weight: form.weight,
        birthdayDate: form.birthdayDate,
        trait: form.trait,
      }
    );

    return updatedPet;
  } catch (error) {
    console.error("Error updating pet:", error);
    throw new Error("Failed to update pet");
  }
}
// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.petsCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.petCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPets(userId) {
  try {
    const pets = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.petsCollectionId,
      [Query.equal("creator", userId)]
    );

    return pets.documents;
  } catch (error) {
    console.error("Error fetching user's pets:", error);
    throw new Error("Failed to fetch user's pets");
  }
}
