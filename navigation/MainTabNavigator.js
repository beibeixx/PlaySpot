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
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
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
              <FontAwesome5 name="search-location" size={24} color="black" />
            );
          }
          if (route.name === "Favorite") {
            return <MaterialIcons name="favorite" size={24} color="black" />;
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
          if (route.name === "Favorite") {
            return (
              <Text style={{ color, fontSize: 12 }}>Favorites</Text>
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
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
