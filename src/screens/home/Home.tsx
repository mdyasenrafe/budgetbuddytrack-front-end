import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "../../api/category/categoryApi";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";
import { Ionicons } from "@expo/vector-icons";
import CardOverview from "../../components/home/CardOverview";
import { RootState } from "../../store";

const HomeScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useFetchCategoriesQuery();

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ paddingTop: insets.top }}>
          <LoadingSpinner size="large" color={colors.primary} />
        </View>
      ) : (
        <View>
          <View style={{ ...styles.headerContainer, paddingTop: insets.top }}>
            <View style={styles.welcomeContainer}>
              <View>
                <CustomText preset="p3" style={styles.welcomeText}>
                  Welcome Back
                </CustomText>
                <CustomText preset="h3" style={styles.userNameText}>
                  {user?.name}
                </CustomText>
              </View>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </View>
          </View>
          <CardOverview />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContainer: {
    backgroundColor: colors.orangePeel,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 48,
  },
  welcomeText: {
    color: colors.antiFlashWhite,
  },
  userNameText: {
    color: "white",
  },
});

export default HomeScreen;
