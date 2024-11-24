// Common styles for pages using cards to show list items
import { StyleSheet } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

export const cardStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.primary[100],
      },
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
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
