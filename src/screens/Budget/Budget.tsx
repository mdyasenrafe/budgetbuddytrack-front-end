import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMonthName } from "../../utils/timeFunction";
import CustomText from "../../components/common/Text/CustomText";
import { CustomButton } from "../../components/common/Button";
import { screenWidth } from "../../theme/theme";
import { BottomTabScreenTypeProps } from "../../utils/types/navigationType";
import { useGetBudgetByIdQuery } from "../../api/budget/BudgetApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Budget({
  navigation,
}: BottomTabScreenTypeProps<"Budget">) {
  const insets = useSafeAreaInsets();
  const monthName = getMonthName();
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const { data, isLoading } = useGetBudgetByIdQuery({ userId: userId || "" });
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top, marginBottom: 24 }}>
        <CustomText
          preset="h3"
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          {monthName}
        </CustomText>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 24,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}
      >
        <CustomText
          style={{ color: colors.grey, textAlign: "center" }}
          preset="p3"
        >
          You don't have a set budget. Let's create a budget so you can manage
          your spending.
        </CustomText>
      </ScrollView>
      <CustomButton
        title="Create Budget"
        customStyle={{
          width: screenWidth - 48,
          position: "absolute",
          bottom: 40,
          height: 60,
          alignSelf: "center",
        }}
        onButtonPress={() => navigation.navigate("AddBudget")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
