import { TextStyle } from "react-native";
import { Typography } from "../../../theme/typography";

const BASE: TextStyle = {
  fontFamily: Typography.regular,
  fontSize: 16,
};
const BOLD: TextStyle = {
  fontWeight: "700",
  fontFamily: Typography.bold,
};
const MEDIUM: TextStyle = {
  fontWeight: "500",
  fontFamily: Typography.medium,
};

export const presets = {
  default: BASE,
  bold: BOLD,
  medium: MEDIUM,
  h1: {
    ...BOLD,
    fontSize: 36,
  },
  h2: {
    ...BOLD,
    fontSize: 32,
  },
  h3: {
    ...BOLD,
    fontSize: 30,
  },
  h4: {
    ...BOLD,
    fontSize: 24,
  },
  h5: {
    ...BOLD,
    fontSize: 22,
  },
  h6: {
    ...MEDIUM,
    fontSize: 18,
  },
  p1: {
    fontFamily: Typography.regular,
    fontSize: 20,
  },
  p2: {
    fontFamily: Typography.regular,
    fontSize: 18,
  },
  p3: {
    fontFamily: Typography.regular,
    fontSize: 16,
  },
  p4: {
    fontFamily: Typography.regular,
    fontSize: 14,
  },
  p5: {
    fontFamily: Typography.regular,
    fontSize: 12,
  },
  p6: {
    fontFamily: Typography.regular,
    fontSize: 10,
  },
  p1_medium: {
    ...MEDIUM,
    fontSize: 20,
  },
  p2_medium: {
    ...MEDIUM,
    fontSize: 18,
  },
  p3_medium: {
    ...MEDIUM,
    fontSize: 16,
  },
  p4_medium: {
    ...MEDIUM,
    fontSize: 14,
  },
  p5_medium: {
    ...MEDIUM,
    fontSize: 12,
  },
  p6_medium: {
    ...MEDIUM,
    fontSize: 10,
  },
  p1_bold: {
    ...BOLD,
    fontSize: 20,
  },
  p2_bold: {
    ...BOLD,
    fontSize: 18,
  },
  p3_bold: {
    ...BOLD,
    fontSize: 16,
  },
  p4_bold: {
    ...BOLD,
    fontSize: 14,
  },
  p5_bold: {
    ...BOLD,
    fontSize: 12,
  },
  p6_bold: {
    ...BOLD,
    fontSize: 10,
  },
};

export type TextPresets = keyof typeof presets;
