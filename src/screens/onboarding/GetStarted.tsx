import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../theme/theme";
// @ts-ignore
import moneyGif from "../../../assets/image/auth/money_income.png";

export default function GetStarted() {
  return (
    <SafeAreaView>
      <Image
        source={{
          width: screenWidth,
          height: screenHeight / 2,
        }}
      />
      <Text>Track, budget, analyze, and save money easily.</Text>
    </SafeAreaView>
  );
}
