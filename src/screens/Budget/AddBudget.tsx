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
import { useCreateBudgetMutation } from "../../api/budget/BudgetApi";
import { AuthStyles } from "../../styles/AuthStyles";
import { showMessage } from "../../components/common/ToastMessage";
import { BudgetCreationRequest } from "../../utils/types/BudgetType";

export default function AddBudget({
  navigation,
}: MainStackScreenProps<"AddBudget">) {
  const [createBudget, { isLoading }] = useCreateBudgetMutation();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState("0");
  const [formError, setFormError] = useState({
    field: "",
    message: "",
    hasError: false,
  });

  const { expenseCategories } = useSelector(
    (state: RootState) => state.category
  );
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = async () => {
    if (!validateFormFields()) {
      try {
        const formattedAmount = parseInt(amount);
        const category = expenseCategories?.find(
          (item) => item.value === selectedCategory
        );
        const bodyData: BudgetCreationRequest = {
          userId: userId || "",
          limit: formattedAmount,
          category: category?._id || "",
        };
        const res = await createBudget(bodyData).unwrap();
        showMessage({
          type: "success",
          message: "New budget added",
        });
        navigation.goBack();
      } catch (error) {
        let errorMessage = "An error occurred";
        if (typeof error === "object" && error !== null) {
          const apiError = error as ApiError;
          if (apiError.data?.message) {
            errorMessage = apiError.data.message;
          }
        }
        showError("", errorMessage);
      }
    }
  };

  const validateFormFields = () => {
    if (!amount) return showError("amount", "Amount is required");
    else if (!selectedCategory)
      return showError("category", "Category is required");
    return false;
  };

  const showError = (field: string, message: string) => {
    setFormError({ field, message, hasError: true });
    return true;
  };

  const clearError = () =>
    setFormError({ field: "", message: "", hasError: false });

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
          onTextChange={(value) => {
            setAmount(value);
          }}
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
      <View style={{ marginTop: 16 }}>
        {formError.hasError && (
          <CustomText style={AuthStyles.errorText}>
            {formError.message}
          </CustomText>
        )}
      </View>
      <CustomButton
        onButtonPress={handleContinue}
        title="Continue"
        customStyle={FinancialTrackingStyles.submitButton}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </View>
  );
}
