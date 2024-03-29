import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AuthStyles } from "../../styles/AuthStyles";
import { CustomInputProps } from "../../utils/types/textInputType";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../components/common/Text/CustomText";
import { colors } from "../../theme/colors";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { useChangePasswordMutation } from "../../api/auth/authApi";
import { showMessage } from "../../components/common/ToastMessage";

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function PasswordChangeScreen({
  navigation,
}: MainStackScreenProps<"ChangePassword">) {
  const [changePassword, { isLoading, isError }] = useChangePasswordMutation();
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errorState, setErrorState] = useState({
    errorField: "",
    errorMessage: "",
    hasError: false,
  });

  const generatePasswordField = (
    fieldName: keyof PasswordFormData,
    placeholder: string
  ): CustomInputProps => ({
    key: fieldName,
    placeholderText: placeholder,
    capitalizationMode: "none",
    inputType: "default",
    isSecureTextEntry: !passwordVisibility[fieldName],
    hasShowPasswordOption: true,
    showPasswordToggleComponent: (
      <TouchableOpacity
        onPress={() =>
          setPasswordVisibility((prevState) => ({
            ...prevState,
            [fieldName]: !prevState[fieldName],
          }))
        }
      >
        <Feather
          name={passwordVisibility[fieldName] ? "eye" : "eye-off"}
          size={20}
          color="black"
        />
      </TouchableOpacity>
    ),
  });

  const inputFields: CustomInputProps[] = [
    generatePasswordField("currentPassword", "Current Password"),
    generatePasswordField("newPassword", "New Password"),
    generatePasswordField("confirmPassword", "Confirm New Password"),
  ];

  const handleInputChange = (
    fieldName: keyof typeof passwordData,
    value: string
  ) => {
    setPasswordData({ ...passwordData, [fieldName]: value });
    clearError();
  };

  const clearError = () =>
    setErrorState({ errorField: "", errorMessage: "", hasError: false });

  const showError = (field: string, message: string) => {
    setErrorState({ errorField: field, errorMessage: message, hasError: true });
    return true;
  };

  const handleSubmit = async () => {
    if (!passwordData.currentPassword)
      return showError("currentPassword", "Current password is required.");
    else if (!passwordData.newPassword)
      return showError("newPassword", "New password is required.");
    else if (!passwordData.confirmPassword)
      return showError(
        "confirmPassword",
        "Confirming new password is required."
      );
    else if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showError(
        "",
        "New password and password confirmation do not match."
      );
    } else {
      try {
        await changePassword(passwordData).unwrap();
        showMessage({
          type: "success",
          message: "password has been changed successfully.",
        });
        navigation.goBack();
      } catch (error: unknown) {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
        <CustomText preset="h4">Change Password</CustomText>
        <View />
      </View>
      {inputFields.map((field) => (
        <CustomInput
          key={field.key}
          placeholderText={field.placeholderText}
          onTextChange={(value) =>
            handleInputChange(field.key as keyof PasswordFormData, value)
          }
          capitalizationMode={field.capitalizationMode}
          inputType={field.inputType}
          isSecureTextEntry={field.isSecureTextEntry}
          showPasswordToggleComponent={field.showPasswordToggleComponent}
          hasShowPasswordOption={field.hasShowPasswordOption}
          containerStyle={StyleSheet.flatten([
            AuthStyles.inputContainer,
            {
              borderColor:
                field.key === errorState.errorField ? "red" : "lightgrey",
            },
          ])}
        />
      ))}
      {errorState.hasError && (
        <Text style={AuthStyles.errorText}>{errorState.errorMessage}</Text>
      )}
      <View>
        <CustomButton
          title="Submit"
          customStyle={StyleSheet.flatten([
            styles.submitButton,
            AuthStyles.getStartedButton,
          ])}
          onButtonPress={handleSubmit}
          isDisabled={isLoading}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 20,
  },
});
