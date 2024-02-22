import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../components/common/Text/CustomText";
import { AntDesign, Feather } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
// @ts-ignore
import { CustomInputProps } from "../../utils/types/textInputType";
import CustomInput from "../../components/common/CutomInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStyles } from "../../styles/AuthStyles";
import { CustomButton } from "../../components/common/Button";
import { isValidateEmail } from "../../utils/validEmail";
import { MainNavigationParamList } from "../../utils/types/navigationType";

type userDataType = {
  email: string;
  password: string;
};
type errorType = {
  type: string;
  message: string;
  error: boolean;
};

type Props = NativeStackScreenProps<MainNavigationParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [user, setUser] = useState<userDataType>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleInputChange = (field: keyof UserDataType, value: string) => {
    setUser({ ...user, [field]: value });
    updateError("", "", false);
  };
  const [error, setError] = useState<errorType>({
    type: "",
    message: "",
    error: false,
  });

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

  const updateError = (type: string, message: string, error: boolean) => {
    setError({
      type: type,
      message: message,
      error: error,
    });
  };
  const handleSubmit = () => {
    if (!user.email) {
      updateError("email", "Email is required", true);
    } else if (!isValidateEmail(user?.email)) {
      updateError("email", "Please enter a valid email", true);
    } else if (!user.password) {
      updateError("password", "Password is required", true);
    } else {
      updateError("", "", false);
    }
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color={colors.primary}
        onPress={() => navigation.goBack()}
      />
      <View style={loginStyles.header}>
        <CustomText preset="h3" style={loginStyles.title}>
          Welcome Back
        </CustomText>
        <CustomText preset="p3" style={loginStyles.welcomeText}>
          We are Happy to see you again. let's get started
        </CustomText>
      </View>
      <View style={loginStyles.header}>
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
            containerStyle={StyleSheet.flatten([
              loginStyles.inputContainer,
              {
                borderColor: field.key === error.type ? "red" : "lightgrey",
              },
            ])}
          />
        ))}
        <View>
          <CustomText preset="p3_bold" style={loginStyles.errorText}>
            {error.error && error.message}
          </CustomText>
        </View>
      </View>
      <View>
        <CustomButton
          title="Submit"
          customStyle={StyleSheet.flatten([AuthStyles.getStartedButton])}
          onButtonPress={handleSubmit}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <CustomText style={loginStyles.loginPrompt}>
            don't Have an account?{" "}
            <CustomText style={loginStyles.loginText}>Signup</CustomText>
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
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
    color: colors.black,
  },
  welcomeText: {
    marginTop: 8,
    marginBottom: 24,
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: 14,
  },
  loginText: {
    color: colors.secondary,
  },
  inputContainer: {
    marginBottom: 24,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
});
