import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../../components/common/Text/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../../theme/color";
import CustomInput from "../../components/common/CutomInput";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { CustomInputProps } from "../../utils/types/TextInputType";
import { CustomButton } from "../../components/common/Button";
import { AuthStyles } from "../../styles/AuthStyles";

type userDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const inputDatas: CustomInputProps[] = [
    {
      placeholderText: "Name",
      onTextChange: (value: string) => {
        setUserData({ ...userData, name: value });
      },
      capitalizationMode: "words",
      containerStyle: {
        marginBottom: 24,
      },
    },
    {
      placeholderText: "Email",
      onTextChange: (value: string) => {
        setUserData({ ...userData, email: value });
      },
      inputType: "email-address",
      containerStyle: {
        marginBottom: 24,
      },
    },
    {
      placeholderText: "Password",
      onTextChange: (value: string) => {
        setUserData({ ...userData, password: value });
      },
      containerStyle: {
        marginBottom: 24,
      },
      isSecureTextEntry: !showPassword,
      hasShowPasswordOption: true,
      showPasswordToggleComponent: (
        <TouchableOpacity
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      ),
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 8,
      }}
    >
      <AntDesign name="arrowleft" size={24} color={color.primary} />
      <View
        style={{
          marginTop: 16,
        }}
      >
        <CustomText preset="h3">Let's Create Your Account</CustomText>
        <CustomText
          preset="p4"
          style={{
            marginTop: 6,
            color: color.black,
          }}
        >
          Welcome to BudgetBuddyTrack app. Let's get started.
        </CustomText>
        <View
          style={{
            marginTop: 24,
          }}
        >
          {inputDatas.map((input) => (
            <CustomInput
              placeholderText={input.placeholderText}
              onTextChange={input.onTextChange}
              capitalizationMode={input.capitalizationMode}
              inputType={input.inputType}
              showPasswordToggleComponent={input.showPasswordToggleComponent}
              hasShowPasswordOption={input.hasShowPasswordOption}
              isSecureTextEntry={input.isSecureTextEntry}
              containerStyle={input.containerStyle}
            />
          ))}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              onPress={() => setIsRemember(!isRemember)}
              name={isRemember ? "check-square" : "square"}
              size={24}
              color={color.primary}
              style={{
                marginRight: 8,
              }}
            />
            <CustomText>Remember me</CustomText>
          </View>
        </View>
        <View>
          <CustomButton
            title="Submit"
            customStyle={[
              AuthStyles.getStartedButton,
              {
                marginTop: 24,
              },
            ]}
          />
          <CustomText style={styles.loginPrompt}>
            Already Have an account?{" "}
            <CustomText style={styles.loginText}>Login</CustomText>
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginPrompt: {
    textAlign: "center",
    marginTop: 14,
  },
  loginText: {
    color: color.secondary,
  },
});
