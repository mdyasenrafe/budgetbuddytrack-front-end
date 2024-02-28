import { StyleSheet } from "react-native";
import { screenWidth } from "../theme/theme";
import { colors } from "../theme/colors";
import { Typography } from "../theme/typography";

export const FinancialTrackingStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    zIndex: -2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    zIndex: -2,
    paddingHorizontal: 16,
  },
  amountInputContainer: {
    paddingTop: 100,
  },
  amountInput: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: "white",
  },
  amountInputText: {
    color: "white",
    fontSize: 24,
    fontFamily: Typography.bold,
  },
  inputMargin: {
    marginTop: 24,
  },
  addInvoiceButton: {
    flexDirection: "row",
    width: screenWidth - 32,
    borderWidth: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "lightgrey",
    backgroundColor: "#fafafa",
    marginTop: 24,
  },
  addInvoiceButtonText: {
    color: colors.grey,
  },
  submitButton: {
    position: "absolute",
    bottom: 80,
    width: screenWidth - 32,
    justifyContent: "center",
    left: 16,
  },
  labelContainer: {
    paddingHorizontal: 16,
  },
  labelText: {
    color: colors.white,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
  pickerContainer: {
    marginTop: 40,
  },
});
