import { View, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import CustomText from "../../components/common/Text/CustomText";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { colors } from "../../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import {
  FinancialTrackingStyles,
  pickerSelectStyles,
} from "../../styles/FinancialTrackingStyles";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CategoryItem } from "../../utils/types/categoryType";

export default function AddExpense({
  navigation,
}: MainStackScreenProps<"AddExpense">) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState();
  const [amount, setAmount] = useState("");
  const { expenseCategories } = useSelector(
    (state: RootState) => state.category
  );

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
          Add Expense
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
          inputValue={"$"}
          onTextChange={(value) => setAmount(value)}
          inputType="number-pad"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={FinancialTrackingStyles.scrollView}
      >
        <View style={FinancialTrackingStyles.pickerContainer}>
          {expenseCategories && (
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={expenseCategories as CategoryItem[]}
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

        <CustomInput placeholderText="Description" />
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
