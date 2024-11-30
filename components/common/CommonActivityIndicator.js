import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../../styles/helper/colors";
import { activityIndicator } from "../../styles/components/activityIndicator";

export default function CommonActivityIndicator() {
  return (
    <View style={activityIndicator.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary[500]} />
    </View>
  );
}

const styles = StyleSheet.create({});
