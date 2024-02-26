// Import statements and other initial code remain unchanged
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import CustomText from "../Text/CustomText";
import { colors } from "../../../theme/colors";
import { screenWidth } from "../../../theme/theme";
import { Feather, Entypo } from "@expo/vector-icons";
// @ts-ignore
import addExpense from "../../../../assets/image/icons/expense.png";
// @ts-ignore
import addIncome from "../../../../assets/image/icons/income.png";

export default function TransactionModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const options = [
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
      <View style={styles.modalContainer}>
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton}>
              <Image source={option.image} style={styles.optionImage} />
              <View style={styles.optionTextContainer}>
                <CustomText preset="h4">{option.title}</CustomText>
                <CustomText preset="p4" style={styles.optionDescription}>
                  {option.description}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.closeButtonInner}>
            <Feather name="x" size={35} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// Styles moved here for cleanliness
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    width: screenWidth - 32,
  },
  optionButton: {
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
  },
  optionImage: {
    width: 60,
    height: 60,
  },
  optionTextContainer: {
    width: "80%",
    marginLeft: 8,
  },
  optionDescription: {
    color: "grey",
    marginTop: 8,
  },
  closeButton: {
    position: "absolute",
    bottom: 50,
  },
  closeButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
