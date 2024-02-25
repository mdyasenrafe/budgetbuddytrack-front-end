import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.log("Failed to save the token", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Failed to fetch the token", error);
    return null;
  }
};
