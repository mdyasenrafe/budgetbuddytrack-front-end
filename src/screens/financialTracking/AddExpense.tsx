// React and React Native core imports
import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Expo
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Custom components and utility types
import CustomText from "../../components/common/Text/CustomText";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { CategoryItem } from "../../utils/types/categoryType";

// Styles and themes
import { colors } from "../../theme/colors";
import {
  FinancialTrackingStyles,
  pickerSelectStyles,
} from "../../styles/FinancialTrackingStyles";
import { AuthStyles } from "../../styles/AuthStyles";

// Third-party components
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// API and other utilities
import { useImageUploadMutation } from "../../api/imageUpload";
import { showMessage } from "../../components/common/ToastMessage";
import moment from "moment";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { useAddExpenseMutation } from "../../api/transaction/transactionApi";

interface InvoiceType {
  picture: string;
  pictureBase64: string;
}

export default function AddExpense({
  navigation,
}: MainStackScreenProps<"AddExpense">) {
  const insets = useSafeAreaInsets();
  // states
  const [invoice, setInvoice] = useState<InvoiceType | null>();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>();
  const [formError, setFormError] = useState({
    field: "",
    message: "",
    hasError: false,
  });

  const { expenseCategories } = useSelector(
    (state: RootState) => state.category
  );
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  // apis
  const [imageUpload, { isLoading: imageLoading }] = useImageUploadMutation();
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const fileSizeInBytes: number = result?.assets[0]?.fileSize || 0;
      const fileSizeInKB = fileSizeInBytes / 1024;
      if (fileSizeInKB > 500) {
        showMessage({
          type: "error",
          message: "Image must be less than 500KB",
        });
      } else {
        setInvoice({
          picture: result.assets[0].uri || "",
          pictureBase64: result.assets[0].base64 || "",
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateFormFields()) {
      try {
        const formattedAmount = parseInt(amount);
        const category = expenseCategories?.find(
          (item) => item.value === selectedCategory
        );
        const bodyData = {
          userId: userId,
          amount: formattedAmount,
          description: description,
          date: selectedDate,
          type: "income",
          category: category?._id,
          invoice: "",
        };
        if (invoice?.pictureBase64) {
          const res = await imageUpload({
            url: invoice.pictureBase64,
          }).unwrap();
          bodyData["invoice"] = res?.link || "";
        } else {
          // @ts-ignore
          delete bodyData["invoice"];
        }
        const res = await addExpense(bodyData).unwrap();
        console.log("res =>", res);
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
    else if (!description)
      return showError("description", "Description is required");
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
          Add Expense
        </CustomText>
        <View />
      </View>

      <View style={FinancialTrackingStyles.amountInputContainer}>
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
            clearError();
          }}
          inputType="number-pad"
          currencySymbol={true}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={FinancialTrackingStyles.scrollView}
      >
        <View style={FinancialTrackingStyles.pickerContainer}>
          {expenseCategories && (
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedCategory(value);
                clearError();
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

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={(date) => {
              setSelectedDate(moment(date).format());
              setDatePickerVisibility(false);
            }}
            onCancel={() => {
              setDatePickerVisibility(false);
            }}
          />
        </View>

        <TouchableOpacity
          style={[
            GlobalStyles.inputContainer,
            {
              marginBottom: 24,
              alignItems: "center",
            },
          ]}
          onPress={() => setDatePickerVisibility(true)}
        >
          <CustomText
            preset="p4"
            style={{ color: selectedDate ? "black" : "#ced4da" }}
          >
            {selectedDate
              ? moment(selectedDate).format("Do MMM YYYY, h:mm a")
              : "Select Date and Time"}
          </CustomText>
        </TouchableOpacity>
        <CustomInput
          placeholderText="Description"
          inputValue={description}
          onTextChange={(value) => {
            setDescription(value);
            clearError();
          }}
        />

        {invoice?.picture ? (
          <View style={FinancialTrackingStyles.invoiceImageContainer}>
            <Image
              source={{ uri: invoice.picture }}
              style={FinancialTrackingStyles.invoiceImage}
            />
            <TouchableOpacity
              style={FinancialTrackingStyles.invoiceEditIcon}
              onPress={() => setInvoice(null)}
            >
              <Ionicons name="close" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={FinancialTrackingStyles.addInvoiceButton}
            onPress={chooseImage}
          >
            <Feather name="paperclip" size={24} />
            <CustomText
              preset="h6"
              style={FinancialTrackingStyles.addInvoiceButtonText}
            >
              Add Invoice
            </CustomText>
          </TouchableOpacity>
        )}
        <View style={{ marginTop: 16 }}>
          {formError.hasError && (
            <CustomText style={AuthStyles.errorText}>
              {formError.message}
            </CustomText>
          )}
        </View>
      </ScrollView>
      <CustomButton
        onButtonPress={handleSubmit}
        title="Submit"
        customStyle={FinancialTrackingStyles.submitButton}
        isDisabled={imageLoading || isLoading}
        isLoading={imageLoading || isLoading}
      />
    </View>
  );
}
