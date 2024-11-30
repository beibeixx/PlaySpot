import { StyleSheet } from "react-native";
import { colors } from "../helper/colors";


export const locationManagerStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: colors.neutral[100],
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
  },
});
