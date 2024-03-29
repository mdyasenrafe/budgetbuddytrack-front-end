import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  Home: undefined;
  Transaction: undefined;
  Add: undefined;
  Budget: undefined;
  Profile: undefined;
};

export type MainNavigationParamList = {
  SplashScreen: undefined;
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  ChangePassword: undefined;
  EditProfile: undefined;
  AddIncome: undefined;
  AddExpense: undefined;
  AddBudget: undefined;
};

export type MainStackScreenProps<T extends keyof MainNavigationParamList> =
  NativeStackScreenProps<MainNavigationParamList, T>;

export type BottomTabScreenTypeProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    MainStackScreenProps<keyof MainNavigationParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface MainParamList extends MainNavigationParamList {}
  }
}
