import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AuthStyles } from "../../styles/AuthStyles";
import { CustomInputProps } from "../../utils/types/textInputType";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../components/common/Text/CustomText";
import { colors } from "../../theme/colors";
import { CustomButton } from "../../components/common/Button";
import CustomInput from "../../components/common/CutomInput";

type FormDataType = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePassword({
  navigation,
}: MainStackScreenProps<"ChangePassword">) {
  const [formData, setFormData] = useState<FormDataType>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [formError, setFormError] = useState({});

  const createPasswordField = (
    key: keyof FormDataType,
    placeholderText: string
  ): CustomInputProps => ({
    key,
    placeholderText,
    capitalizationMode: "none",
    inputType: "default",
    isSecureTextEntry: !isPasswordVisible[key],
    hasShowPasswordOption: true,
    showPasswordToggleComponent: (
      <TouchableOpacity
        onPress={() =>
          setIsPasswordVisible((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
          }))
        }
      >
        <Feather
          name={isPasswordVisible[key] ? "eye" : "eye-off"}
          size={20}
          color="black"
        />
      </TouchableOpacity>
    ),
  });

  const inputFields: CustomInputProps[] = [
    createPasswordField("oldPassword", "Old Password"),
    createPasswordField("newPassword", "New Password"),
    createPasswordField("confirmNewPassword", "Confirm New Password"),
  ];

  // Rest of your component...

  const handleInputChange = (name: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [name]: value });
    clearError();
  };

  const clearError = () => setFormError({});

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 16,
      }}
    >
      <View style={styles.header}>
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
            handleInputChange(field.key as keyof FormDataType, value)
          }
          capitalizationMode={field.capitalizationMode}
          inputType={field.inputType}
          isSecureTextEntry={field.isSecureTextEntry}
          showPasswordToggleComponent={field.showPasswordToggleComponent}
          hasShowPasswordOption={field.hasShowPasswordOption}
          containerStyle={AuthStyles.inputContainer}
        />
      ))}
      <View>
        <CustomButton
          title="Submit"
          customStyle={StyleSheet.flatten([
            styles.submitButton,
            AuthStyles.getStartedButton,
          ])}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 20,
  },
});
