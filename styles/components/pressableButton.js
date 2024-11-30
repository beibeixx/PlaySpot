//Styles for reusable pressableButton component
import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";


export const pressableButtonStyles = StyleSheet.create({
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: colors.neutral[400],
  },
});
