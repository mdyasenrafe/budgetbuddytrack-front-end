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
    marginLeft: 8,
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
  imageEditIcon: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: colors.secondary,
    borderRadius: 17.5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOSContainer: {
    marginBottom: 30,
  },
  inputIOS: {
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#fafafa",
    height: 48,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#fafafa",
    height: 48,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 24,
  },
  inputAndroidContainer: {
    marginBottom: 30,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
