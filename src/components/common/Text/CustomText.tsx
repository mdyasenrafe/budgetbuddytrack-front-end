import { View, Text, StyleSheet, TextStyle } from "react-native";
import React, { Children } from "react";
import { TextPresets, presets } from "./Text.presets";

interface TextPropsType {
  children: React.ReactNode;
  preset?: TextPresets;
  style?: TextStyle;
}

export default function CustomText(props: TextPropsType) {
  const { children, preset = "default", style } = props;
  const styles = StyleSheet.compose(style, presets[preset]);
  return <Text style={styles}>{children}</Text>;
}
