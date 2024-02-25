import { View } from "react-native";
import React from "react";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../components/common/Text/CustomText";

export default function EditProfile({
  navigation,
}: MainStackScreenProps<"EditProfile">) {
  return (
    <SafeAreaView>
      <CustomText>Edit Profile</CustomText>
    </SafeAreaView>
  );
}
