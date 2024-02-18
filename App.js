import React from "react";
import Login from "./src/screens/Login";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import RNBootSplash from "react-native-bootsplash"
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
      <Stack.Navigator initialRouteName="SplshScreen" screenOptions={{
        headerShown: false,
        statusBarColor: "transparent",
        statusBarTranslucent: true
      }}>
        <Stack.Screen name="SplshScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}