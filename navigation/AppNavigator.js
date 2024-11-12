// Main navigator
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaygroundDetailScreen from "../screens/playground/PlaygroundDetailScreen";
import ModifyPlanScreen from "../screens/plan/ModifyPlanScreen";
import PlanDetailsScreen from "../screens/plan/PlanDetailsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import FavoriteListScreen from "../screens/favorites/FavoriteListScreen";
import Login from "../screens/account/Login";
import Signup from "../screens/account/Signup";

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: "blue",
  },
  headerTintColor: "white",
  headerBackTitleVisible: false,
};

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Group screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name="Playground Details"
          component={PlaygroundDetailScreen}
        />
        <Stack.Screen name="Modify Plan" component={ModifyPlanScreen} />
        <Stack.Screen name="Plan Details" component={PlanDetailsScreen} />
        <Stack.Screen name="Favorite List" component={FavoriteListScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
