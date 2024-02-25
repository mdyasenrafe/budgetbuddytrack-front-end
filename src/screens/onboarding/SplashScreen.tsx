import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
// @ts-ignore
import splashImage from "../../../assets/splash.png";
import { screenHeight, screenWidth } from "../../theme/theme";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getToken } from "../../utils/storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";
import { MainStackScreenProps } from "../../utils/types/navigationType";

export default function SplashScreen({
  navigation,
}: MainStackScreenProps<"SplashScreen">) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getTokenFromStorage();
  }, []);

  const getTokenFromStorage = () => {
    getToken()
      .then((res) => {
        if (res) {
          dispatch(setToken(res));
          setLoading(false);
        } else {
          navigation.navigate("GetStarted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <Image
        source={splashImage}
        style={{
          width: screenWidth,
          height: screenHeight,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        {loading && <LoadingSpinner size="large" color="white" />}
      </View>
    </View>
  );
}
