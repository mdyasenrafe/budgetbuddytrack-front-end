import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFetchCategoriesQuery } from "../../api/category/categoryApi";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { colors } from "../../theme/colors";
import CustomText from "../../components/common/Text/CustomText";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { screenWidth } from "../../theme/theme";
import CardOverview from "../../components/home/CardOverview";
// import CardShape from "../../../assets/image/card_shape.png";

export default function Home() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError } = useFetchCategoriesQuery();

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {isLoading ? (
        <View style={{ paddingTop: insets.top }}>
          <LoadingSpinner size="large" color={colors.primary} />
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: "#EC9126",
              paddingTop: insets.top,
              paddingHorizontal: 16,
              paddingBottom: 24,
              borderBottomEndRadius: 30,
              borderBottomStartRadius: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 48,
              }}
            >
              <View>
                <CustomText preset="p3" style={{ color: "#fafafa" }}>
                  Welcome Back
                </CustomText>
                <CustomText
                  preset="h3"
                  style={{
                    color: "white",
                  }}
                >
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
}
