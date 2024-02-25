import { View, Text } from "react-native";
import React from "react";
import { MainStackScreenProps } from "../../utils/types/navigationType";

export default function ChangePassword({
  navigation,
}: MainStackScreenProps<"ChangePassword">) {
  return (
    <View>
      <Text>ChangePassword</Text>
    </View>
  );
}
