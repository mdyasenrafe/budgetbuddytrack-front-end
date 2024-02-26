import React, { useState } from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import HomeScreen from "../screens/home/Home";
import TransactionScreen from "../screens/transaction/Transaction";
import BudgetScreen from "../screens/Budget/Budget";
import ProfileScreen from "../screens/Profile/Profile";
import { BottomTabParamList } from "../utils/types/navigationType";
import { colors } from "../theme/colors";
import { Feather, Entypo } from "@expo/vector-icons";
import TransactionModal from "../components/common/modal/TransactionModal";

type RouteName = keyof BottomTabParamList;
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const renderIcon = (iconName: string, isFocused: boolean) => (
    <Feather
      name={iconName as any}
      size={35}
      color={isFocused ? colors.primary : colors.grey}
    />
  );

  const tabScreenOptions = ({
    route,
  }: BottomTabScreenProps<BottomTabParamList, RouteName>) => ({
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBar,
    unmountOnBlur: true,
    headerShown: false,
    tabBarIcon: ({ focused }: any) => {
      const iconName = iconNameForRoute(route.name, focused);
      return renderIcon(iconName, focused);
    },
  });

  const iconNameForRoute = (
    routeName: RouteName,
    isFocused: boolean
  ): string => {
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
        return "circle";
    }
  };

  const AddButton = ({ onPress }: any) => {
    return isModalVisible ? (
      <View
        style={{
          width: 70,
          height: 70,
        }}
      ></View>
    ) : (
      <TouchableOpacity onPress={onPress} style={styles.addButton}>
        <View style={styles.addButtonInner}>
          <Entypo name="plus" size={35} color={colors.white} />
        </View>
      </TouchableOpacity>
    );
  };

  const NullComponent = () => null;

  return (
    <>
      <Tab.Navigator screenOptions={tabScreenOptions} initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Transaction" component={TransactionScreen} />
        <Tab.Screen
          name="Add"
          component={NullComponent}
          options={{
            tabBarButton: () => (
              <AddButton onPress={() => setIsModalVisible(true)} />
            ),
          }}
        />
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      {isModalVisible && (
        <TransactionModal
          modalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
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
  addButton: {
    top: -30,
  },
  hiddenAddButton: {
    width: 0,
    height: 0,
  },
  addButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
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

export default BottomTab;
