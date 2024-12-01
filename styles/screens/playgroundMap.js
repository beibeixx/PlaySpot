import { StyleSheet, Platform } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

export const playgroundMapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  map: {
    flex: 1,
  },
  // Modal styles
  modalContainer: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    paddingTop: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.neutral[300],
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  modalContent: {
    padding: spacing.xl,
  },
  playgroundTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  addressIcon: {
    marginRight: spacing.sm,
    color: colors.primary[500],
  },
  addressText: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    flex: 1,
  },
  descriptionContainer: {
    marginBottom: spacing.xl,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  descriptionText: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    lineHeight: typography.size.md * 1.5,
  },
  // Action buttons
  actionContainer: {
    flexDirection: "row",
    gap: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
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
  selectButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  cancelButtonText: {
    color: colors.text.primary,
  },
  selectButtonText: {
    color: colors.text.white,
  },
  // Loading state
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  // Custom marker
  customMarker: {
    backgroundColor: colors.primary[500],
    padding: spacing.xxs,
    borderRadius: layout.borderRadius.full,
    borderWidth: 2,
    borderColor: colors.text.white,
  },
  selectedMarker: {
    backgroundColor: colors.secondary[500],
    transform: [{ scale: 1.2 }],
  },
});
