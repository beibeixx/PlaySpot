import { View, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../../styles/helper/colors";
import { activityIndicatorStyles } from "../../styles/components/activityIndicator";

export default function CommonActivityIndicator() {
  return (
    <View style={activityIndicatorStyles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary[500]} />
    </View>
  );
}

