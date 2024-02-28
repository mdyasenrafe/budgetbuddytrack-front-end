import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFetchCategoriesQuery } from "../../api/category/categoryApi";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";

export default function Home() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError } = useFetchCategoriesQuery();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {isLoading && <LoadingSpinner size="large" color={colors.primary} />}
      <CustomText> Home </CustomText>
    </SafeAreaView>
  );
}
