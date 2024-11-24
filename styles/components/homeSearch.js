// Styles for home search and filter components
import { StyleSheet } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";
import { typography } from "../../styles/helper/typography";

export const searchBarStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral[50],
    borderRadius: layout.borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    ...layout.shadow.sm,
  },
  searchIcon: {
    marginRight: spacing.xs,
    color: colors.neutral[400],
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: typography.size.md,
    color: colors.text.primary,
  },
  placeholder: {
    color: colors.neutral[500],
  },
});

export const filterBarStyles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  filterChip: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.md,
    borderRadius: layout.borderRadius.lg,
    backgroundColor: colors.secondary[100],
    borderWidth: 1,
    borderColor: colors.neutral[200],
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.xs,
  },
  filterChipSelected: {
    backgroundColor: colors.background.highlight,
    borderColor: colors.primary[200],
  },
  filterText: {
    fontSize: typography.size.sm,
    color: colors.neutral[500],
  },
  filterTextSelected: {
    color: colors.primary[500],
    fontWeight: typography.weight.medium,
  },
});
