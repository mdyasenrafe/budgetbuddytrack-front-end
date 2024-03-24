import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import CustomText from "../common/Text/CustomText";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { screenWidth } from "../../theme/theme";
import {
  useFetchCardDetailsQuery,
  useUpdateTotalAmountMutation,
} from "../../api/card/CardApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../common/LoadingSpinner";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../common/CutomInput";
import { CustomButton } from "../common/Button";
import { showMessage } from "../common/ToastMessage";

export default function CardOverview() {
  const [totalAmount, setTotalAmount] = useState("");
  const { isLoading, details: cardDetails } = useSelector(
    (state: RootState) => state.card
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // API hooks
  const { isLoading: cardLoading } = useFetchCardDetailsQuery();
  const [updateTotalAmount, { isLoading: updatingTotalAmount }] =
    useUpdateTotalAmountMutation();

  // BottomSheet ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // BottomSheet snap points
  const snapPoints = useMemo(() => ["40%"], []);

  // BottomSheet modal presentation
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // BottomSheet change handler
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    if (!cardDetails?.totalBalance && !isLoading && !cardLoading) {
      handlePresentModalPress();
    }
  }, [cardDetails, isLoading, cardLoading]);

  const handleSubmit = async () => {
    if (!totalAmount) {
      showMessage({ type: "error", message: "Total amount is required" });
      return;
    }

    try {
      await updateTotalAmount({
        userId: user?._id,
        totalBalance: totalAmount,
      }).unwrap();
      bottomSheetModalRef.current?.close();
    } catch (error) {
      showMessage({
        type: "error",
        message: "An error occurred while updating the total amount.",
      });
    }
  };

  return (
    <>
      <View style={styles.cardContainer}>
        {isLoading || cardLoading ? (
          <LoadingSpinner color="white" size="large" />
        ) : (
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <CustomText preset="p3" style={styles.whiteText}>
                Total Balance
              </CustomText>
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color="white"
                onPress={handlePresentModalPress}
              />
            </View>
            <CustomText preset="h3" style={styles.whiteText}>
              ${cardDetails?.totalBalance}
            </CustomText>
            <View style={styles.cardStats}>
              <View>
                <View style={styles.statItem}>
                  <View style={styles.iconBackground}>
                    <AntDesign name="arrowdown" size={16} color="white" />
                  </View>
                  <CustomText preset="p3" style={styles.statText}>
                    Income
                  </CustomText>
                </View>
                <CustomText preset="h5" style={styles.whiteText}>
                  ${cardDetails?.totalIncome}
                </CustomText>
              </View>
              <View>
                <View style={styles.statItem}>
                  <View style={styles.iconBackground}>
                    <AntDesign name="arrowup" size={16} color="white" />
                  </View>
                  <CustomText preset="p3" style={styles.statText}>
                    Expense
                  </CustomText>
                </View>
                <CustomText preset="h5" style={styles.whiteText}>
                  ${cardDetails?.totalExpense}
                </CustomText>
              </View>
            </View>
          </View>
        )}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.sheetBackground}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          <CustomInput
            placeholderText="Total Balance"
            inputType="number-pad"
            onTextChange={setTotalAmount}
          />
          <CustomButton
            title={cardDetails?.totalBalance ? "Update" : "Submit"}
            onButtonPress={handleSubmit}
            isLoading={updatingTotalAmount}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginHorizontal: 16,
    position: "absolute",
    top: 130,
    left: 0,
    width: screenWidth - 32,
    padding: 16,
  },
  cardContent: {},
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  whiteText: {
    color: "white",
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconBackground: {
    padding: 8,
    backgroundColor: "#4e918d",
    borderRadius: 24,
    width: 30,
    height: 30,
    marginRight: 8,
  },
  statText: {
    color: "#D0E5E4",
  },
  bottomSheetView: {
    flex: 1,
    alignItems: "center",
  },
  sheetBackground: {
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});
