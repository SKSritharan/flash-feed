import { useContext, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/ApiService";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function RegisterScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const isRegisterSuccess = await createUser(email, password);

      if (isRegisterSuccess) {
        navigation.navigate("Login");
      } else {
        console.error("User registration failed.");
        Alert.alert(
          "Registration failed!",
          "Please try again or check your input."
        );
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please try again later."
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}
