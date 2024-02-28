import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Home() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  // console.log("user =>", user, "token =>N", token);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text>Home</Text>
    </SafeAreaView>
  );
}
