import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity } from "react-native";
import { color } from "../../theme/color";
import CustomText from "./Text/CustomText";

interface ButtonProps {
  title: string;
  customStyle?: TextStyle;
  onButtonPress?: () => void;
  buttonColor?: string;
  isDisabled?: boolean;
}

export function CustomButton({
  title,
  customStyle,
  onButtonPress,
  buttonColor,
  isDisabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonBase, styles.buttonSize, customStyle]}
      onPress={onButtonPress}
      disabled={isDisabled}
    >
      <CustomText preset="h6" style={{ color: buttonColor || color.white }}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSize: {
    width: 165,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBase: {
    borderRadius: 8,
    backgroundColor: color.primary,
  },
});
