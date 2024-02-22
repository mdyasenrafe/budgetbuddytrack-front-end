import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomText from "../../components/common/Text/CustomText";
import { CustomButton } from "../../components/common/Button";
import { color } from "../../theme/color";
import CustomInput from "../../components/common/CutomInput";
import { AuthStyles } from "../../styles/AuthStyles";
import { CustomInputProps } from "../../utils/types/TextInputType";

// Define the type for the user data state
type UserDataType = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isRememberMeChecked, setIsRememberMeChecked] =
    useState<boolean>(false);

  const handleInputChange = (field: keyof UserDataType, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const inputFields: CustomInputProps[] = [
    {
      key: "name",
      placeholderText: "Name",
      capitalizationMode: "words",
      inputType: "default",
    },
    {
      key: "email",
      placeholderText: "Email",
      capitalizationMode: "none",
      inputType: "email-address",
    },
    {
      key: "password",
      placeholderText: "Password",
      capitalizationMode: "none",
      inputType: "default",
      isSecureTextEntry: !isPasswordVisible,
      hasShowPasswordOption: true,
      showPasswordToggleComponent: (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <SafeAreaView style={signupStyles.container}>
      <AntDesign name="arrowleft" size={24} color={color.primary} />
      <View style={signupStyles.header}>
        <CustomText preset="h3" style={signupStyles.title}>
          Let's Create Your Account
        </CustomText>
        <CustomText preset="p3" style={signupStyles.welcomeText}>
          Welcome to BudgetBuddyTrack app. Let's get started.
        </CustomText>
      </View>

      <View style={signupStyles.header}>
        {inputFields.map((field) => (
          <CustomInput
            key={field.key}
            placeholderText={field.placeholderText}
            onTextChange={(value) =>
              handleInputChange(field.key as keyof UserDataType, value)
            }
            capitalizationMode={field.capitalizationMode}
            inputType={field.inputType}
            isSecureTextEntry={field.isSecureTextEntry}
            showPasswordToggleComponent={field.showPasswordToggleComponent}
            hasShowPasswordOption={field.hasShowPasswordOption}
            containerStyle={signupStyles.inputContainer}
          />
        ))}
        <TouchableOpacity
          style={signupStyles.rememberMeContainer}
          onPress={() => setIsRememberMeChecked(!isRememberMeChecked)}
        >
          <Feather
            name={isRememberMeChecked ? "check-square" : "square"}
            size={24}
            color={color.primary}
          />
          <CustomText style={signupStyles.rememberMeText}>
            Remember me
          </CustomText>
        </TouchableOpacity>
      </View>

      <View>
        <CustomButton
          title="Submit"
          customStyle={StyleSheet.flatten([
            signupStyles.submitButton,
            AuthStyles.getStartedButton,
          ])}
        />

        <CustomText style={signupStyles.loginPrompt}>
          Already Have an account?{" "}
          <CustomText style={signupStyles.loginText}>Login</CustomText>
        </CustomText>
      </View>
    </SafeAreaView>
  );
}

const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
  header: {
    marginTop: 16,
  },
  title: {
    marginTop: 6,
    color: color.black,
  },
  welcomeText: {
    marginTop: 8,
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  rememberMeText: {
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 24,
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: 14,
  },
  loginText: {
    color: color.secondary,
  },
  inputContainer: {
    marginBottom: 24,
  },
});
