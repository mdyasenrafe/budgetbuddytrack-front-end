import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../screens/onboarding/GetStarted";
import Login from "../screens/onboarding/Login";
import Signup from "../screens/onboarding/Signup";

const Stack = createNativeStackNavigator<MainNavigationParamList>();

export default function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
