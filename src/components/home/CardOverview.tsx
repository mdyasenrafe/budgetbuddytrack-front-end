import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import CustomText from "../common/Text/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { screenWidth } from "../../theme/theme";

export default function CardOverview() {
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
  );
}
