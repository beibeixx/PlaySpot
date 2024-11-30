import { StyleSheet, Platform } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

export const modifyPlanStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  // Search section
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
  searchSection: {
    position: "relative",
    zIndex: 2,
    marginBottom: spacing.lg,
  },
  searchResultsContainer: {
    position: "absolute",
    top: 44, // Height of search input
    left: 0,
    right: 0,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    maxHeight: 300,
    zIndex: 2,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    marginBottom: spacing.xs,
  },
  searchInputContainer: {
    backgroundColor: colors.background.input,
    borderRadius: layout.borderRadius.lg,
    height: 44,
  },
  searchInput: {
    color: colors.text.primary,
  },
  playgroundList: {
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    marginTop: spacing.xs,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  playgroundItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  playgroundItemText: {
    fontSize: typography.size.md,
    color: colors.text.primary,
  },
  // Selected location
  selectedLocation: {
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedLocationText: {
    fontSize: typography.size.md,
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
    marginBottom: spacing.sm,
  },
  // Map select button
  mapSelectButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary[50],
    padding: spacing.sm,
    borderRadius: layout.borderRadius.md,
    alignSelf: "flex-start",
    marginBottom: spacing.md,
  },
  mapSelectText: {
    fontSize: typography.size.sm,
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
  },
  // Form section
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.background.input,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.size.md,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  // Time picker
  timeContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  timeButton: {
    flex: 1,
    backgroundColor: colors.background.input,
    padding: spacing.sm,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  timeButtonText: {
    fontSize: typography.size.md,
    color: colors.text.primary,
  },
  // Action buttons
  actionContainer: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.card,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  submitButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.white,
  },
});
