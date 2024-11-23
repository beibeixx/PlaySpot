import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";
import { cardStyles } from "./card";

const screenWidth = Dimensions.get("window").width;

export const pressableButtonStyles = StyleSheet.create({
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: colors.neutral[400],
  },
});
