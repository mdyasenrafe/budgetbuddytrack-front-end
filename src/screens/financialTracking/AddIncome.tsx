import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { screenWidth } from "../../theme/theme";
import { Typography } from "../../theme/typography";
import { FinancialTrackingStyles } from "../../styles/FinancialTrackingStyles";

export default function AddIncome({
  navigation,
}: MainStackScreenProps<"AddIncome">) {
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[FinancialTrackingStyles.container, { paddingTop: insets.top }]}
    >
      <View style={FinancialTrackingStyles.header}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.white}
          onPress={handleGoBack}
        />
        <CustomText preset="h4" style={FinancialTrackingStyles.headerTitle}>
          Add Income
        </CustomText>
        <View />
      </View>
      <View style={FinancialTrackingStyles.amountInputContainer}>
        <CustomInput
          placeholderText="$"
          containerStyle={FinancialTrackingStyles.amountInput}
          textStyle={FinancialTrackingStyles.amountInputText}
          placeholderTextColor="white"
          labelText="How Much"
          labelComponentDisplay={
            <View style={FinancialTrackingStyles.labelContainer}>
              <CustomText preset="h5" style={FinancialTrackingStyles.labelText}>
                How Much?
              </CustomText>
            </View>
          }
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={FinancialTrackingStyles.scrollView}
      >
        <CustomInput
          placeholderText="Category"
          containerStyle={FinancialTrackingStyles.inputMargin}
        />
        <CustomInput
          placeholderText="Description"
          containerStyle={FinancialTrackingStyles.inputMargin}
        />
        <TouchableOpacity style={FinancialTrackingStyles.addInvoiceButton}>
          <Feather name="paperclip" size={24} color={colors.grey} />
          <CustomText
            preset="h6"
            style={FinancialTrackingStyles.addInvoiceButtonText}
          >
            Add Invoice
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
      <CustomButton
        title="Submit"
        customStyle={FinancialTrackingStyles.submitButton}
      />
    </View>
  );
}
