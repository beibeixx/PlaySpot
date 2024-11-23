import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

const screenWidth = Dimensions.get("window").width;

export const planListStyles = StyleSheet.create({

  listContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.primary[50],
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
    paddingBottom: spacing.sm,
    ...layout.shadow.sm,
  },
  cardContent: {
    padding: spacing.lg,
  },
  planName: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.neutral[800],
    marginBottom: spacing.xxs,
  },
  timeText: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
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
