import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  Home: undefined;
  Transaction: undefined;
  Budget: undefined;
  Profile: undefined;
};

export type MainNavigationParamList = {
  SplashScreen: undefined;
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
};

export type MainStackScreenProps<T extends keyof MainNavigationParamList> =
  NativeStackScreenProps<MainNavigationParamList, T>;

export type BottomTabScreenTypeProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    MainStackScreenProps<keyof MainNavigationParamList>
  >;
