import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import {
  FinancialTrackingStyles,
  pickerSelectStyles,
} from "../../styles/FinancialTrackingStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CategoryItem } from "../../utils/types/categoryType";
import RNPickerSelect from "react-native-picker-select";

export default function AddIncome({
  navigation,
}: MainStackScreenProps<"AddIncome">) {
  const { incomeCategories } = useSelector(
    (state: RootState) => state.category
  );

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
        <View style={FinancialTrackingStyles.pickerContainer}>
          {incomeCategories && (
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={incomeCategories as CategoryItem[]}
              placeholder={{
                label: "Select a category",
                value: null,
              }}
              style={pickerSelectStyles}
              Icon={() => (
                <Feather name="arrow-down" size={20} color="#ced4da" />
              )}
            />
          )}
        </View>
        <CustomInput
          placeholderText="Description"
          containerStyle={FinancialTrackingStyles.inputMargin}
        />
        <TouchableOpacity style={FinancialTrackingStyles.addInvoiceButton}>
          <Feather name="paperclip" size={24} />
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
