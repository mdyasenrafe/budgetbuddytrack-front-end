import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
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
import { showMessage } from "../../components/common/ToastMessage";
import * as ImagePicker from "expo-image-picker";
import { AuthStyles } from "../../styles/AuthStyles";
import { useImageUploadMutation } from "../../api/imageUpload";
import moment from "moment";

interface InvoiceType {
  picture: string;
  pictureBase64: string;
}

export default function AddIncome({
  navigation,
}: MainStackScreenProps<"AddIncome">) {
  // states
  const [invoice, setInvoice] = useState<InvoiceType | null>();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formError, setFormError] = useState({
    field: "",
    message: "",
    hasError: false,
  });
  const { incomeCategories } = useSelector(
    (state: RootState) => state.category
  );
  // apis
  const [imageUpload, { isLoading: imageLoading }] = useImageUploadMutation();

  const insets = useSafeAreaInsets();

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
        const formattedAmount = parseFloat(amount.split("$")[1]).toFixed(2);

        const bodyData = {
          amount: formattedAmount,
          description: description,
          date: moment().format(),
          type: "income",
          category: selectedCategory,
          invoice: "",
        };
        if (invoice?.pictureBase64) {
          const res = await imageUpload({
            url: invoice.pictureBase64,
          }).unwrap();
          bodyData["invoice"] = res?.link || "";
        }
        console.log(bodyData);
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
          inputValue="$"
          onTextChange={(value) => {
            setAmount(value);
            clearError();
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={FinancialTrackingStyles.scrollView}
      >
        <View style={FinancialTrackingStyles.pickerContainer}>
          {incomeCategories && (
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedCategory(value);
                clearError();
              }}
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
        isDisabled={imageLoading}
        isLoading={imageLoading}
      />
    </View>
  );
}
