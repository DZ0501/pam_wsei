// Navigation
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from "@react-navigation/native";
import MainTabs from "./common/MainTabs";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <StatusBar />
    
    <Stack.Navigator>
      <Stack.Screen
        name="Navigation"
        component={MainTabs}
        options={{ header: () => "" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
