import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../screens/onboarding/GetStarted";

const Stack = createNativeStackNavigator<MainNavigationParamList>();

export default function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
    </Stack.Navigator>
  );
}
