import { StyleSheet } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { typography } from "../../styles/helper/typography";

export const favoriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  listContainer: {
    paddingVertical: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.secondary,
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.size.lg,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  emptyIcon: {
    color: colors.neutral[300],
    marginBottom: spacing.md,
  },
});
