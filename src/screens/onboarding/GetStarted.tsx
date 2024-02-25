import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../theme/theme";
import CustomText from "../../components/common/Text/CustomText";
import { CustomButton } from "../../components/common/Button";
import { colors } from "../../theme/colors";
import { MainStackScreenProps } from "../../utils/types/navigationType";
//@ts-ignore
import moneyGif from "../../../assets/image/auth/money_income.png";

export default function GetStarted({
  navigation,
}: MainStackScreenProps<"GetStarted">) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={moneyGif} style={styles.image} resizeMode="contain" />
      <View style={styles.textView}>
        <CustomText preset="h2" style={styles.headerText}>
          Track, budget, analyze, and save money easily
        </CustomText>
        <CustomButton
          title="Get Started"
          customStyle={styles.getStartedButton}
          onButtonPress={() => navigation.navigate("Signup")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <CustomText style={styles.loginPrompt}>
            Already Have an account?{" "}
            <CustomText style={styles.loginText}>Login</CustomText>
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: screenWidth,
    height: screenHeight / 1.8,
  },
  textView: {
    paddingHorizontal: 8,
  },
  headerText: {
    textAlign: "center",
  },
  getStartedButton: {
    width: screenWidth - 36,
    marginTop: 48,
    alignSelf: "center",
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: 8,
  },
  loginText: {
    color: colors.secondary,
  },
});
