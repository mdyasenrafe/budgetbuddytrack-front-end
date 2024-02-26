import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../Text/CustomText";
import { colors } from "../../../theme/colors";
import { screenWidth } from "../../../theme/theme";
import { Feather, Entypo } from "@expo/vector-icons";

export default function BottomTransctionModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let expense =
    "Use this to note down what you spend, from snacks to bills. It shows you where your money goes and helps you spend wisely. Start now!";
  let income =
    "Add all the money you earn, like your salary or gifts, here. It helps you see how much you make and where it comes from. Easy and quick!";
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
          width: screenWidth,
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            width: screenWidth,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <CustomText style={{ marginBottom: 15, textAlign: "center" }}>
            Your Modal Content Here
          </CustomText>
          {/* Close Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              elevation: 2,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <CustomText style={{ color: "white" }}>Hide Modal</CustomText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            width: screenWidth,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <CustomText style={{ marginBottom: 15, textAlign: "center" }}>
            Your Modal Content Here
          </CustomText>
          {/* Close Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              elevation: 2,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <CustomText style={{ color: "white" }}>Hide Modal</CustomText>
          </TouchableOpacity>
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
