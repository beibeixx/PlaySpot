/**
 * MainTabNavigator.js
 *
 * This component sets up the bottom tab navigation for the app,
 * including the Home, Plans, Favorites, and Account screens.
 */
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import PlanScreen from "../screens/plan/PlanScreen";
import MemoryScreen from "../screens/memory/MemoryScreen";
import AccountScreen from "../screens/account/AccountScreen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure the tab bar icons
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <FontAwesome5 name="search-location" size={24} color="black" />
            );
          }
          if (route.name === "Plan") {
            return (
              <MaterialIcons name="task" size={24} color="black" />
            );
          }
          if (route.name === "Memory") {
            return <MaterialIcons name="menu-book" size={24} color="black" />;
          }
          if (route.name === "Account") {
            return (
              <MaterialIcons name="account-circle" size={24} color="black" />
            );
          }
        },
        // Style the header
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        // Style the tab bar
        tabBarStyle: {
          backgroundColor: "blue",
        },
        tabBarActiveTintColor: "yellow",
        tabBarInactiveTintColor: "gray",
        // Configure the tab bar labels
        tabBarLabel: ({ focused }) => {
          let color = focused
            ? "yellow"
            : "gray";
          if (route.name === "Home") {
            return (
              <Text style={{ color, fontSize: 12 }}>
                Home
              </Text>
            );
          }
          if (route.name === "Plan") {
            return (
              <Text style={{ color, fontSize: 12 }}>
                Plan
              </Text>
            );
          }
          if (route.name === "Memory") {
            return (
              <Text style={{ color, fontSize: 12 }}>Memory</Text>
            );
          }
          if (route.name === "Account") {
            return (
              <Text style={{ color, fontSize: 12 }}>
                Account
              </Text>
            );
          }
        },
      })}
    >
      {/* Define the tab screens */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Memory" component={MemoryScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
