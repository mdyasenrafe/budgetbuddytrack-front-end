import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  FinancialTrackingStyles,
  pickerSelectStyles,
} from "../../styles/FinancialTrackingStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import CustomText from "../../components/common/Text/CustomText";
import CustomInput from "../../components/common/CutomInput";

// Third-party components
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CategoryItem } from "../../utils/types/categoryType";
import { CustomButton } from "../../components/common/Button";

export default function AddBudget({
  navigation,
}: MainStackScreenProps<"AddBudget">) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { expenseCategories } = useSelector(
    (state: RootState) => state.category
  );
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {};

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
          Add Budget
        </CustomText>
        <View />
      </View>
      <View
        style={[
          FinancialTrackingStyles.amountInputContainer,
          {
            paddingTop: 330,
          },
        ]}
      >
        <CustomInput
          placeholderText=""
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
          //   onTextChange={(value) => {
          //     setAmount(value);
          //     clearError();
          //   }}
          inputType="number-pad"
          currencySymbol={true}
        />
      </View>
      <View style={FinancialTrackingStyles.scrollView}>
        <View style={FinancialTrackingStyles.pickerContainer}>
          {expenseCategories && (
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedCategory(value);
              }}
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
      </View>
      <CustomButton
        onButtonPress={handleContinue}
        title="Continue"
        customStyle={FinancialTrackingStyles.submitButton}
      />
    </View>
  );
}
