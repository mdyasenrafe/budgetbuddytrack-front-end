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
          <View
            style={{
              height: 200,
              backgroundColor: colors.primary,
              borderRadius: 20,
              marginHorizontal: 16,
              position: "absolute",
              top: 130,
              left: 0,
              width: screenWidth - 32,
              padding: 16,
            }}
          >
            <View>
              <CustomText
                preset="p3"
                style={{
                  color: "white",
                }}
              >
                Total Balance
              </CustomText>
              <CustomText
                preset="h3"
                style={{
                  color: "white",
                }}
              >
                $245,000
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      backgroundColor: "#4e918d",
                      borderRadius: 24,
                      width: 30,
                      height: 30,
                      marginRight: 8,
                    }}
                  >
                    <AntDesign name="arrowdown" size={16} color="white" />
                  </View>
                  <CustomText
                    preset="p3"
                    style={{
                      color: "#D0E5E4",
                    }}
                  >
                    Total Income
                  </CustomText>
                </View>
                <CustomText
                  preset="h5"
                  style={{
                    color: "white",
                    marginLeft: 4,
                  }}
                >
                  $245,000
                </CustomText>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      backgroundColor: "#4e918d",
                      borderRadius: 24,
                      width: 30,
                      height: 30,
                      marginRight: 8,
                    }}
                  >
                    <AntDesign name="arrowup" size={16} color="white" />
                  </View>
                  <CustomText
                    preset="p3"
                    style={{
                      color: "#D0E5E4",
                    }}
                  >
                    Total Expense
                  </CustomText>
                </View>
                <CustomText
                  preset="h5"
                  style={{
                    color: "white",
                    marginLeft: 4,
                  }}
                >
                  $245,000
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
