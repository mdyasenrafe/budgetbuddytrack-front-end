import { View, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import CustomText from "../../components/common/Text/CustomText";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { colors } from "../../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { FinancialTrackingStyles } from "../../styles/FinancialTrackingStyles";
import RNPickerSelect from "react-native-picker-select";
import { screenWidth } from "../../theme/theme";

export default function AddExpense({
  navigation,
}: MainStackScreenProps<"AddExpense">) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState();

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
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" },
          ]}
          placeholder={{
            label: "Category",
            value: "",
          }}
          style={{
            inputIOS: {
              borderWidth: 1,
              borderColor: "lightgrey",
              backgroundColor: "#fafafa",
              height: 48,
              paddingHorizontal: 16,
              alignItems: "center",
            },
            inputAndroid: {
              borderWidth: 1,
              borderColor: "lightgrey",
              backgroundColor: "#fafafa",
              height: 48,
              paddingHorizontal: 16,
              alignItems: "center",
            },
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          Icon={() => {
            return <Feather name="arrow-down" size={20} color={colors.grey} />;
          }}
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
