// For search bar on main page

import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/helper/colors";
import { searchBarStyles } from "./styles";

export default function SearchBar({ onSearch }) {
  return (
    <View style={searchBarStyles.container}>
      <View style={searchBarStyles.inputContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={colors.primary[400]}
          style={searchBarStyles.searchIcon}
        />
        <TextInput
          placeholder="Search for playground"
          onChangeText={onSearch}
          clearButtonMode="while-editing"
          style={searchBarStyles.input}
          placeholderTextColor={colors.text.secondary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
