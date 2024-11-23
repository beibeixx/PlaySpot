import { StyleSheet } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

export const cardStyles = StyleSheet.create({
  listContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  cardContainer: {
    backgroundColor: colors.primary[50],
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
    ...layout.shadow.sm,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.neutral[800],
  },
  imageContainer: {
    width: "100%",
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
