import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../../../components/common/Text/CustomText";
import { BottomTabScreenTypeProps } from "../../../utils/types/navigationType";
import { colors } from "../../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, setUser } from "../../../features/auth/authSlice";
import { DemoImage } from "../../../theme/theme";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Profile({
  navigation,
}: BottomTabScreenTypeProps<"Profile">) {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const profileData = [
    {
      id: 1,
      title: "Edit Profile",
      icon: <Feather name="user" size={24} color="black" />,
      handlePress: () => {},
    },
    {
      id: 2,
      title: "Change Password",
      icon: <AntDesign name="lock" size={24} color="black" />,
      handlePress: () => {},
    },
    {
      id: 3,
      title: "Log out",
      icon: <MaterialIcons name="logout" size={24} color="red" />,
      handlePress: () => handleLogout(),
    },
  ];
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("GetStarted");
    dispatch(setUser(null));
    dispatch(setToken(null));
  };
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        paddingTop: statusBarHeight,
        zIndex: -2,
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        <CustomText
          preset="p1_medium"
          style={{
            color: "white",
          }}
        >
          Profile
        </CustomText>
        <View />
      </View>
      <View>
        <Image
          source={{
            uri: user?.profilePicture,
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 130,
            alignSelf: "center",
            position: "absolute",
            top: 50,
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 120,
          backgroundColor: "white",
          borderTopEndRadius: 24,
          borderTopLeftRadius: 24,
          zIndex: -2,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ height: 100 }} />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <CustomText
            style={{
              color: "black",
            }}
            preset="h3"
          >
            {user?.name}
          </CustomText>
          <CustomText
            style={{
              color: "#939393",
            }}
            preset="p3"
          >
            {user?.email}
          </CustomText>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#C9C9C9",
            marginVertical: 16,
          }}
        />
        <View
          style={{
            marginTop: 8,
          }}
        >
          {profileData.map((item, index) => (
            <View
              key={item.id}
              style={{
                marginTop: 16,
              }}
            >
              <TouchableOpacity onPress={item.handlePress}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                    <CustomText
                      style={{
                        color: "black",
                        marginLeft: 16,
                      }}
                      preset="p2_medium"
                    >
                      {item.title}
                    </CustomText>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
              {index !== profileData.length - 1 && (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#C9C9C9",
                    marginVertical: 16,
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
