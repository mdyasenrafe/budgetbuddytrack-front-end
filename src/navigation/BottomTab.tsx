import React, { useState } from "react";
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import HomeScreen from "../screens/home/Home";
import TransactionScreen from "../screens/transaction/Transaction";
import BudgetScreen from "../screens/Budget/Budget";
import ProfileScreen from "../screens/Profile/Profile";
import { BottomTabParamList } from "../utils/types/navigationType";
import { colors } from "../theme/colors";
import { Feather, Entypo } from "@expo/vector-icons";
import CustomText from "../components/common/Text/CustomText";
import BottomTransctionModal from "../components/common/modal/BottomTransctionModal";

type RouteName = keyof BottomTabParamList;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const renderTabBarIcon = (name: string, focused: boolean) => (
    <Feather
      name={name as any}
      size={35}
      color={focused ? colors.primary : colors.grey}
    />
  );

  const screenOptions = ({
    route,
  }: BottomTabScreenProps<BottomTabParamList, RouteName>) => ({
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBar,
    unmountOnBlur: true,
    headerShown: false,
    tabBarIcon: ({ focused }: any) => {
      const iconName = getIconName(route.name, focused);
      return renderTabBarIcon(iconName, focused);
    },
  });

  const getIconName = (routeName: RouteName, focused: boolean): string => {
    switch (routeName) {
      case "Home":
        return "home";
      case "Transaction":
        return "bar-chart";
      case "Budget":
        return "book";
      case "Profile":
        return "user";
      default:
        return "circle"; // Default icon
    }
  };

  const PlusButton = ({ onPress }: any) => {
    return modalVisible ? (
      <View
        style={{
          width: 70,
          height: 70,
        }}
      ></View>
    ) : (
      <TouchableOpacity
        onPress={onPress}
        style={{
          top: -30,
        }}
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
          <Entypo name="plus" size={35} color={colors.white} />
        </View>
      </TouchableOpacity>
    );
  };

  const NullComponent = () => {
    return null;
  };

  return (
    <>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Transaction" component={TransactionScreen} />
        <Tab.Screen
          name="Add"
          component={NullComponent}
          options={{
            tabBarButton: () => (
              <PlusButton onPress={() => setModalVisible(true)} />
            ),
          }}
        />
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      {modalVisible && (
        <BottomTransctionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabsBackground,
    borderColor: "#000000",
    height: 90,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    top: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
