import { View, StyleSheet } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { colors } from "../../theme/colors";
import CustomText from "../common/Text/CustomText";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { screenWidth } from "../../theme/theme";
import {
  useGetCardQuery,
  useSetTotalAmountMutation,
} from "../../api/card/CardApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../common/LoadingSpinner";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import CustomInput from "../common/CutomInput";
import { CustomButton } from "../common/Button";
import { showMessage } from "../common/ToastMessage";
import { useNavigation } from "@react-navigation/native";

export default function CardOverview() {
  const [totalAmount, setTotalAmount] = useState<string>("");
  const { isLoading, data } = useSelector((state: RootState) => state.card);
  const { user } = useSelector((state: RootState) => state.auth);

  const navigation = useNavigation();

  // api
  const { isLoading: cardLoading } = useGetCardQuery();
  const [setAmount, { isLoading: setAmountLoading }] =
    useSetTotalAmountMutation();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    if (!data?.totalBalance && !isLoading && !cardLoading) {
      handlePresentModalPress();
    }
  }, [data, isLoading, cardLoading]);

  const handleSubmit = async () => {
    if (!totalAmount || totalAmount == "")
      return showMessage({
        type: "error",
        message: "Total amount is required",
      });
    else {
      const bodyData = {
        userId: user?._id,
        totalBalance: totalAmount,
      };
      try {
        await setAmount(bodyData).unwrap();
        bottomSheetModalRef.current?.close();
      } catch (error: unknown) {
        let errorMessage = "An error occurred";
        if (typeof error === "object" && error !== null) {
          const apiError = error as ApiError;
          if (apiError.data?.message) {
            errorMessage = apiError.data.message;
          }
        }
        showMessage({
          type: "error",
          message: errorMessage,
        });
      }
    }
  };

  return (
    <>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  preset="p3"
                  style={{
                    color: "white",
                  }}
                >
                  Total Balance
                </CustomText>
                <Entypo
                  name="dots-three-horizontal"
                  size={24}
                  color="white"
                  onPress={handlePresentModalPress}
                />
              </View>
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
      <View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          containerStyle={{}}
          backgroundStyle={{
            backgroundColor: "rgba(151, 151, 151, 0.25)",
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <CustomInput
              placeholderText="Total Balance"
              inputType="number-pad"
              returnKeyLabelText="Done"
              keyboardReturnKeyType="done"
              onTextChange={(value) => setTotalAmount(value)}
            />
            <CustomButton
              title={data?.totalBalance ? "Update" : "Submit"}
              customStyle={{ marginTop: 16 }}
              onButtonPress={handleSubmit}
              isDisabled={setAmountLoading}
              isLoading={setAmountLoading}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
