import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import CustomText from "../Text/CustomText";
import { colors } from "../../../theme/colors";
import { screenWidth } from "../../../theme/theme";
import { Feather, Entypo } from "@expo/vector-icons";
// @ts-ignore
import addExpense from "../../../../assets/image/icons/expense.png";
// @ts-ignore
import addIncome from "../../../../assets/image/icons/income.png";

export default function BottomTransctionModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const data = [
    {
      title: "Add Income",
      image: addIncome,
      description:
        "Track your earnings, including salary and gifts, for a clear view of your income sources. Simple and fast!",
    },
    {
      title: "Add Expense",
      image: addExpense,
      description:
        "Log your spending on everything from snacks to bills to manage your finances better. Begin today!",
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: screenWidth - 32,
          }}
        >
          {data.map((item) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                alignItems: "center",
                marginBottom: 16,
                borderRadius: 16,
                padding: 14,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View>
                <Image
                  source={item.image}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </View>
              <View
                style={{
                  width: "80%",
                  marginLeft: 8,
                }}
              >
                <CustomText preset="h4">{item.title}</CustomText>
                <CustomText
                  preset="p4"
                  style={{
                    color: "grey",
                    marginTop: 8,
                  }}
                >
                  {item.description}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 50,
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="x" size={35} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
