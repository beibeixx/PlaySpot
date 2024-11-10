// Main navigator
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaygroundDetailScreen from "../screens/playground/PlaygroundDetailScreen";
import ModifyPlanScreen from "../screens/plan/ModifyPlanScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";

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
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
