import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../theme/colors";
import CustomText from "../common/Text/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { screenWidth } from "../../theme/theme";
import { useGetCardQuery } from "../../api/card/CardApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../common/LoadingSpinner";

export default function CardOverview() {
  const { isLoading: cardLoading } = useGetCardQuery();
  const { isLoading, data } = useSelector((state: RootState) => state.card);

  return (
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
      {isLoading || cardLoading ? (
        <LoadingSpinner color="white" height={180} width={screenWidth - 48} />
      ) : (
        <View>
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
              ${data?.totalBalance}
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
                  Income
                </CustomText>
              </View>
              <CustomText
                preset="h5"
                style={{
                  color: "white",
                  marginLeft: 4,
                }}
              >
                ${data?.totalIncome}
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
                  Expense
                </CustomText>
              </View>
              <CustomText
                preset="h5"
                style={{
                  color: "white",
                  marginLeft: 4,
                }}
              >
                ${data?.totalExpense}
              </CustomText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
