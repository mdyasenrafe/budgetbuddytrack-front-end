import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../theme/theme";
//@ts-ignore
import moneyGif from "../../../assets/image/auth/money_income.png";
import CustomText from "../../components/common/Text/CustomText";
import { CustomButton } from "../../components/common/Button";
import { color } from "../../theme/color";

export default function GetStarted() {
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
        />
        <CustomText style={styles.loginPrompt}>
          Already Have an account?{" "}
          <CustomText style={styles.loginText}>Login</CustomText>
        </CustomText>
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
    color: color.secondary,
  },
});
