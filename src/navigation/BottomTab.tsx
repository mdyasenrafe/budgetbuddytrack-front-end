import React from "react";
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/home/Home";
import TransactionScreen from "../screens/transaction/Transaction";
import BudgetScreen from "../screens/Budget/Budget";
import ProfileScreen from "../screens/Profile/Profile";
import { BottomTabParamList } from "../utils/types/navigationType";
import { colors } from "../theme/colors";
import { Feather } from "@expo/vector-icons";

type RouteName = keyof BottomTabParamList;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
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

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabsBackground,
    borderColor: "#000000",
    height: 80,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    top: 5,
  },
});

export default BottomTabNavigator;
