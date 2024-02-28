import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import Text from "../../components/common/Text/CustomText";
import * as ImagePicker from "expo-image-picker";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { isValidateEmail } from "../../utils/validEmail";
import { colors } from "../../theme/colors";
import { CustomInputProps } from "../../utils/types/textInputType";
import CustomInput from "../../components/common/CutomInput";
import { CustomButton } from "../../components/common/Button";
import { AuthStyles } from "../../styles/AuthStyles";
import { showMessage } from "../../components/common/ToastMessage";
import { useRegisterMutation } from "../../api/auth/authApi";
import { useImageUploadMutation } from "../../api/imageUpload";

const defaultProfileImage = "https://i.ibb.co/7VT9q3H/image.png";

export default function SignupScreen({
  navigation,
}: MainStackScreenProps<"Signup">) {
  const [registerUser, { isLoading, isError, isSuccess }] =
    useRegisterMutation();
  const [imageUpload, { isLoading: imageLoading }] = useImageUploadMutation();
  const [profileData, setProfileData] = useState<UserDataType>({
    name: "",
    email: "",
    password: "",
    profilePicture: defaultProfileImage,
  });

  const [formError, setFormError] = useState({
    field: "",
    message: "",
    hasError: false,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberUser, setRememberUser] = useState(false);

  const handleInputChange = (name: keyof typeof profileData, value: string) => {
    setProfileData({ ...profileData, [name]: value });
    clearError();
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

  const submitProfileData = async () => {
    if (!validateFormFields()) {
      try {
        if (profileData?.profilePicBase64) {
          const res = await imageUpload({
            url: profileData.profilePicBase64,
          }).unwrap();
          profileData["profilePicture"] = res?.link;
        }
        await registerUser(profileData).unwrap();
        navigation.navigate("BottomTab", { screen: "Home" });
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

  const validateFormFields = () => {
    if (!profileData.name) return showError("name", "Please enter your name.");
    if (!profileData.email) return showError("email", "Email is required.");
    if (!isValidateEmail(profileData.email))
      return showError("email", "Enter a valid email.");
    if (!profileData.password)
      return showError("password", "Password cannot be empty.");
    return false;
  };

  const showError = (field: string, message: string) => {
    setFormError({ field, message, hasError: true });
    return true;
  };

  const clearError = () =>
    setFormError({ field: "", message: "", hasError: false });

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
        setProfileData({
          ...profileData,
          profilePicture: result.assets[0].uri || "",
          profilePicBase64: result.assets[0].base64,
        });
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
        <Text preset="h3" style={AuthStyles.title}>
          Create Your Account
        </Text>
        <Text preset="p3" style={styles.subtitle}>
          Welcome! Let's get you set up.
        </Text>
      </View>
      <TouchableOpacity
        onPress={chooseImage}
        style={styles.imagePickerContainer}
      >
        <Image
          source={{ uri: profileData.profilePicture }}
          style={styles.profileImage}
        />
        <View style={styles.imageEditIcon}>
          <Feather name="edit" size={20} color={colors.white} />
        </View>
      </TouchableOpacity>
      <View style={styles.formContainer}>
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
              AuthStyles.inputContainer,
              {
                borderColor:
                  field.key === formError.field ? "red" : "lightgrey",
              },
            ])}
          />
        ))}

        {formError.hasError && (
          <Text style={AuthStyles.errorText}>{formError.message}</Text>
        )}
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberUser(!rememberUser)}
        >
          <Feather
            name={rememberUser ? "check-square" : "square"}
            size={24}
            color={colors.primary}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        title="Submit"
        onButtonPress={submitProfileData}
        customStyle={StyleSheet.flatten([
          styles.submitButton,
          AuthStyles.getStartedButton,
        ])}
        isLoading={isLoading || imageLoading}
        isDisabled={isLoading || imageLoading}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={AuthStyles.loginPrompt}>
          Already have an account?{" "}
          <Text style={AuthStyles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginVertical: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
  },
  imagePickerContainer: {
    position: "relative",
    alignSelf: "center",
    marginTop: 20,
  },
  imageEditIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.secondary,
    borderRadius: 17.5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  rememberMeText: {
    marginLeft: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});
