import { View, Text } from "react-native";
import React from "react";
import { FinancialTrackingStyles } from "../../styles/FinancialTrackingStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddBudget() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[FinancialTrackingStyles.container, { paddingTop: insets.top }]}
    >
      <Text>AddBudget</Text>
    </View>
  );
}
