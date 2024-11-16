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
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.full,
    paddingHorizontal: spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    ...layout.shadow.sm,
  },
  searchIcon: {
    marginRight: spacing.xs,
    color: colors.primary[400],
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: typography.size.md,
    color: colors.text.primary,
  },
  placeholder: {
    color: colors.text.tertiary,
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
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.xs,
  },
  filterChipSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  filterText: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  filterTextSelected: {
    color: colors.text.white,
    fontWeight: typography.weight.medium,
  },
});
