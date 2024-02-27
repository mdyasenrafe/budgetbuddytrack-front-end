import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { screenWidth } from "../../theme/theme";
import { Typography } from "../../theme/typography";

export default function AddIncome({
  navigation,
}: MainStackScreenProps<"AddIncome">) {
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.white}
          onPress={handleGoBack}
        />
        <CustomText preset="h4" style={styles.headerTitle}>
          Add Income
        </CustomText>
        <View />
      </View>
      <View style={styles.amountInputContainer}>
        <CustomInput
          placeholderText="$"
          containerStyle={styles.amountInput}
          textStyle={styles.amountInputText}
          placeholderTextColor="white"
          labelText="How Much"
          labelComponentDisplay={
            <View style={styles.labelContainer}>
              <CustomText preset="h5" style={styles.labelText}>
                How Much?
              </CustomText>
            </View>
          }
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <CustomInput
          placeholderText="Category"
          containerStyle={styles.inputMargin}
        />
        <CustomInput
          placeholderText="Description"
          containerStyle={styles.inputMargin}
        />
        <TouchableOpacity style={styles.addInvoiceButton}>
          <Feather name="paperclip" size={24} color={colors.grey} />
          <CustomText preset="h6" style={styles.addInvoiceButtonText}>
            Add Invoice
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
      <CustomButton title="Submit" customStyle={styles.submitButton} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 12,
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
});
