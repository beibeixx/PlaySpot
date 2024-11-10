// Main navigator
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddEditPlaygroundScreen from "../screens/playground/AddEditPlaygroundScreen";
import PlaygroundDetailScreen from "../screens/playground/PlaygroundDetailScreen";
import UserInfoScreen from "../screens/account/UserInfoScreen";
import ContributionsScreen from "../screens/account/ContributionsScreen";
import NotificationsScreen from "../screens/account/NotificationsScreen";
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
        name="Home"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Modify Playground"
        component={AddEditPlaygroundScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen
        name="Playground Details"
        component={PlaygroundDetailScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen
        name="User Info"
        component={UserInfoScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen
        name="Contributions"
        component={ContributionsScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationsScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
