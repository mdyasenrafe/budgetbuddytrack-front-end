import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../components/common/Text/CustomText";
import { AntDesign, Feather } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import { CustomInputProps } from "../../utils/types/textInputType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStyles } from "../../styles/AuthStyles";
import { CustomButton } from "../../components/common/Button";
import { isValidateEmail } from "../../utils/validEmail";
import { useLoginMutation } from "../../services/auth/auth";
import CustomInput from "../../components/common/CutomInput";
import { MainNavigationParamList } from "../../utils/types/navigationType";

type UserData = {
  email: string;
  password: string;
};

type ErrorInfo = {
  type: string;
  message: string;
  error: boolean;
};

interface ApiError {
  data?: {
    message?: string;
  };
}

type LoginProps = NativeStackScreenProps<MainNavigationParamList, "Login">;

export default function Login({ navigation }: LoginProps) {
  const [login, { isError, isLoading }] = useLoginMutation();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<ErrorInfo>({
    type: "",
    message: "",
    error: false,
  });

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData({ ...userData, [field]: value });
    clearError();
  };

  const inputFields: CustomInputProps[] = [
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
      isSecureTextEntry: !passwordVisible,
      hasShowPasswordOption: true,
      showPasswordToggleComponent: (
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Feather
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      ),
    },
  ];

  const clearError = () => setError({ type: "", message: "", error: false });
  const showError = (type: string, message: string) => {
    setError({ type, message, error: true });
    return true;
  };

  const handleLogin = async () => {
    if (!userData.email) showError("email", "Email is required");
    else if (!isValidateEmail(userData.email))
      showError("email", "Please enter a valid email");
    else if (!userData.password) showError("password", "Password is required");
    else {
      clearError();
      try {
        await login(userData).unwrap();
      } catch (error: unknown) {
        console.log(error);
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
    <SafeAreaView style={AuthStyles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color={colors.primary}
        onPress={() => navigation.goBack()}
      />
      <View style={AuthStyles.header}>
        <CustomText preset="h3" style={AuthStyles.title}>
          Welcome Back
        </CustomText>
        <CustomText preset="p3" style={loginStyles.welcomeText}>
          We are happy to see you again. Let's get started.
        </CustomText>
      </View>
      <View>
        {inputFields.map((field) => (
          <CustomInput
            key={field.key}
            {...field}
            onTextChange={(value) =>
              updateUserData(field.key as keyof UserData, value)
            }
            containerStyle={StyleSheet.flatten([
              AuthStyles.inputContainer,
              { borderColor: field.key === error.type ? "red" : "lightgrey" },
            ])}
          />
        ))}
        {error.error && (
          <CustomText preset="p3_bold" style={AuthStyles.errorText}>
            {error.message}
          </CustomText>
        )}
      </View>
      <View>
        <CustomButton
          title="Submit"
          customStyle={AuthStyles.getStartedButton}
          onButtonPress={handleLogin}
          isDisabled={isLoading}
          isLoading={isLoading}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <CustomText style={AuthStyles.loginPrompt}>
            Don't have an account?{" "}
            <CustomText style={AuthStyles.loginLink}>Signup</CustomText>
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  welcomeText: {
    marginTop: 8,
    marginBottom: 24,
  },
});
