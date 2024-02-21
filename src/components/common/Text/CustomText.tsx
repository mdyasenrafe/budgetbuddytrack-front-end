import { View, Text, StyleSheet } from "react-native";
import React, { Children } from "react";
import { TextPresets, presets } from "./Text.presets";

interface TextPropsType {
  children: React.ReactNode;
  preset?: TextPresets;
  style?: any;
}

export default function CustomText(props: TextPropsType) {
  const { children, preset = "default", style } = props;
  const styles = StyleSheet.compose(style, presets[preset]);
  return <Text style={styles}>{children}</Text>;
}
