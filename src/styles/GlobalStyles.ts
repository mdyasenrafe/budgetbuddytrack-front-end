import { StyleSheet } from "react-native";
import { screenWidth } from "../theme/theme";
import { colors } from "../theme/colors";
import { Typography } from "../theme/typography";

export const GlobalStyles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#C9C9C9",
    marginVertical: 16,
  },
  input: {
    width: "95%",
    height: 50,
    fontSize: 14,
    fontFamily: Typography.regular,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderColor: "lightgrey",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
});
