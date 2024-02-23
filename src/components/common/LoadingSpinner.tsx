import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { screenWidth } from "../../theme/theme";

export default function LoadingSpinner({
  height,
  width,
  size,
}: {
  height?: number;
  width?: number;
  size?: "small" | "large";
}) {
  return (
    <View
      style={{
        height: height ? height : 200,
        width: width ? width : screenWidth,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}
