/**
 * MainTabNavigator.js
 *
 * This component sets up the bottom tab navigation for the app,
 * including the Search, Favorites, and Account screens.
 */
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/map/MapScreen";
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
          if (route.name === "Search") {
            return (
              <FontAwesome5 name="search-location" size={24} color="black" />
            );
          }
          if (route.name === "Favorites") {
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
          if (route.name === "Search") {
            return (
              <Text style={{ color, fontSize: 12 }}>
                Search
              </Text>
            );
          }
          if (route.name === "Favorites") {
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
      <Tab.Screen name="Search" component={MapScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
