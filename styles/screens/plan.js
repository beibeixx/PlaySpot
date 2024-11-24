import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";
import { cardStyles } from "../components/card";

const screenWidth = Dimensions.get("window").width;

export const planStyles = StyleSheet.create({
  mainContainer: cardStyles.cardContainer,
  addButton: {
    padding: spacing.xs,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.primary[500],
    marginRight: spacing.xs,
    marginBottom: spacing.xxs,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: spacing.md,
    backgroundColor: colors.secondary[50],
    borderBottomLeftRadius: layout.borderRadius.sm,
    borderBottomRightRadius: layout.borderRadius.sm,
    ...layout.shadow.sm,
  },
  toggleButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.xxs,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.neutral[50],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  activeToggle: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  toggleText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.text.secondary,
  },
  activeText: {
    color: colors.text.white,
  },
});
