import { StyleSheet } from "react-native";
import { screenWidth } from "../theme/theme";
import { colors } from "../theme/colors";

export const AuthStyles = StyleSheet.create({
  getStartedButton: {
    width: screenWidth - 36,
    marginTop: 48,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 24,
  },
  title: {
    color: colors.black,
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: 20,
  },
  loginLink: {
    color: colors.secondary,
  },
});
