import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../theme/colors";
import CustomText from "./Text/CustomText";

interface ButtonProps {
  title: string;
  customStyle?: TextStyle;
  onButtonPress?: () => void;
  buttonColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function CustomButton({
  title,
  customStyle,
  onButtonPress,
  buttonColor,
  isDisabled,
  isLoading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonBase, styles.buttonSize, customStyle]}
      onPress={onButtonPress}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <>
          <CustomText
            preset="h6"
            style={{ color: buttonColor || colors.white }}
          >
            {title}
          </CustomText>
        </>
      )}
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
    backgroundColor: colors.primary,
  },
});
