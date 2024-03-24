import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMonthName } from "../../utils/timeFunction";
import CustomText from "../../components/common/Text/CustomText";
import { CustomButton } from "../../components/common/Button";
import { screenWidth } from "../../theme/theme";
import { BottomTabScreenTypeProps } from "../../utils/types/navigationType";
import { useFetchBudgetByIdQuery } from "../../api/budget/BudgetApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Slider from "@react-native-community/slider";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function Budget({
  navigation,
}: BottomTabScreenTypeProps<"Budget">) {
  const insets = useSafeAreaInsets();
  const monthName = getMonthName();
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const budgetList = useSelector((state: RootState) => state.budget.budgetList);
  const { data, isLoading } = useFetchBudgetByIdQuery({ userId: userId || "" });

  const { expenseCategories, incomeCategories } = useSelector(
    (state: RootState) => state.category
  );

  const getCategoryName = (selectedCategory: string): string => {
    let category: any;
    category = expenseCategories?.find((item) => item._id === selectedCategory);
    if (!category) {
      category = incomeCategories?.find(
        (item) => item._id === selectedCategory
      );
      return category?.label || "";
    }
    console.log(category);
    return category?.label || "";
  };

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
          backgroundColor: "#F3F3F3",
          padding: 16,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}
      >
        {isLoading ? (
          <>
            <LoadingSpinner color="#2F7E79" size="small" />
          </>
        ) : budgetList.length !== 0 ? (
          budgetList.map((budget) => (
            <View
              key={budget._id}
              style={{
                backgroundColor: colors.white,
                width: screenWidth - 32,
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  borderRadius: 16,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginBottom: 8,
                  backgroundColor: colors.secondary,
                  alignSelf: "flex-start",
                }}
              >
                <CustomText
                  preset="p4"
                  style={{
                    color: "white",
                  }}
                >
                  {getCategoryName(budget.category)}
                </CustomText>
              </View>

              <CustomText preset="h5">
                Remaining ${budget.limit - budget.spent}
              </CustomText>
              <View
                style={{
                  width: screenWidth - 70,
                  height: 20,
                  backgroundColor: "#F1F1FA",
                  borderRadius: 24,
                  overflow: "hidden",
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    width: `${(budget.spent / budget.limit) * 100}%`,
                    height: "100%",
                    backgroundColor: colors.primary,
                    borderRadius: 24,
                  }}
                />
              </View>
            </View>
          ))
        ) : (
          <CustomText
            style={{ color: colors.grey, textAlign: "center" }}
            preset="p3"
          >
            You don't have a set budget. Let's create a budget so you can manage
            your spending.
          </CustomText>
        )}
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
