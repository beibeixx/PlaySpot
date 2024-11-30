import { StyleSheet } from "react-native";
import { colors } from "../helper/colors";

export const activityIndicator = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
  },
});
