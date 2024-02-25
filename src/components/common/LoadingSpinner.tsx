import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { screenWidth } from "../../theme/theme";

// Define the type for the component props
interface LoadingSpinnerProps {
  height?: number;
  width?: number;
  size?: "small" | "large";
  color?: string;
}

export default function LoadingSpinner({
  height = 200,
  width = screenWidth,
  size = "small",
  color = colors.primary,
}: LoadingSpinnerProps) {
  return (
    <View style={[styles.container, { height, width }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
