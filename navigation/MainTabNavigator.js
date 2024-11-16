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
import { colors } from "../styles/helper/colors";

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
              <FontAwesome5 name="search-location" size={24} color={color} />
            );
          }
          if (route.name === "Plan") {
            return <MaterialIcons name="task" size={24} color={color} />;
          }
          if (route.name === "Memory") {
            return <MaterialIcons name="menu-book" size={24} color={color} />;
          }
          if (route.name === "Account") {
            return (
              <MaterialIcons name="account-circle" size={24} color={color} />
            );
          }
        },
        // Style the header
        headerStyle: {
          backgroundColor: colors.background.secondary,
          elevation: 0, // Android
          shadowOpacity: 0, //ios
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 600,
        },
        // Style the tab bar
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.neutral[200],
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[400],
        // Configure the tab bar labels
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text
              style={{
                color,
                fontSize: 12,
                fontWeight: focused ? "600" : "400",
                marginTop: 4,
              }}
            >
              {route.name}
            </Text>
          );
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
