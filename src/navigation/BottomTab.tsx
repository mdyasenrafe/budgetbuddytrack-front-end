import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { color } from "../theme/color";
import Home from "../screens/tabs/home/Home";
import { Feather } from "@expo/vector-icons";
import Transaction from "../screens/tabs/transaction/Transaction";
import Budget from "../screens/tabs/Budget/Budget";
import Profile from "../screens/tabs/Profile/Profile";
import { BottomTabParamList } from "../utils/types/navigationType";

const Tab = createBottomTabNavigator<BottomTabParamList>();

// const Stack = createNativeStackNavigator<MainNavigationParamList>();

export default function BottomTab() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: color.tabsBackground,
            borderColor: "#000000",
            height: 80,
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                size={35}
                color={focused ? color.primary : color.grey}
                style={styles.tab_icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={Transaction}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={35}
                color={focused ? color.primary : color.grey}
                style={styles.tab_icon}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Plus"
          component={PlusScreen}
          options={{
            tabBarButton: () => (
             
            ),
          }}
        /> */}
        <Tab.Screen
          name="Budget"
          component={Budget}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="book"
                size={35}
                color={focused ? color.primary : color.grey}
                style={styles.tab_icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={35}
                color={focused ? color.primary : color.grey}
                style={styles.tab_icon}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  tab_icon: {
    alignItems: "center",
    justifyContent: "center",
    top: 5,
  },
});
