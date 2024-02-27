import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../screens/onboarding/GetStarted";
import Login from "../screens/onboarding/Login";
import Signup from "../screens/onboarding/Signup";
import Home from "../screens/home/Home";
import { MainNavigationParamList } from "../utils/types/navigationType";
import BottomTab from "./BottomTab";
import SplashScreen from "../screens/onboarding/SplashScreen";
import ChangePassword from "../screens/Profile/ChangePassword";
import EditProfile from "../screens/Profile/EditProfile";
import AddIncome from "../screens/financialTracking/AddIncome";
import AddExpense from "../screens/financialTracking/AddExpense";

const Stack = createNativeStackNavigator<MainNavigationParamList>();

export default function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddIncome" component={AddIncome} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
    </Stack.Navigator>
  );
}
