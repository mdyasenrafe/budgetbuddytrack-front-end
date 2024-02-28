import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetInfoFromTokenQuery } from "../../api/auth/authApi";
import { setToken, setUser } from "../../slices/auth/authSlice";
import { getToken } from "../../utils/storage";
import { MainStackScreenProps } from "../../utils/types/navigationType";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { screenHeight, screenWidth } from "../../theme/theme";
// @ts-ignore
import splashImage from "../../../assets/splash.png";
import { RootState, store } from "../../store";

export default function SplashScreen({
  navigation,
}: MainStackScreenProps<"SplashScreen">) {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    loadToken();
  }, [dispatch]);

  const loadToken = async () => {
    const storedToken = await getToken();
    if (storedToken) {
      dispatch(setToken(storedToken));
    } else if (storedToken == null) {
      navigation.navigate("GetStarted");
    }
    setIsTokenLoaded(true);
  };

  const { data, error, isLoading } = useGetInfoFromTokenQuery(undefined, {
    skip: !isTokenLoaded,
  });

  useEffect(() => {
    if (!isLoading && isTokenLoaded && token) {
      if (data) {
        dispatch(setUser(data?.data));
        navigation.navigate("BottomTab", { screen: "Home" });
      } else if (error) {
        console.log("Failed to fetch user info:", error);
        navigation.navigate("GetStarted");
      }
    }
  }, [data, error, isLoading, isTokenLoaded, dispatch, token]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.splashImage} />
      <View style={styles.loadingSpinnerContainer}>
        <LoadingSpinner size="large" color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: screenWidth,
    height: screenHeight,
  },
  loadingSpinnerContainer: {
    position: "absolute",
    bottom: 0,
  },
});
