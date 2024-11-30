import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";
import { typography } from "../../styles/helper/typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const memoryDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  // Title section
  nameSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    margin: spacing.lg,
    marginBottom: spacing.md,
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
  nameInput: {
    flex: 1,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginRight: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background.input,
    borderRadius: layout.borderRadius.md,
  },
  nameText: {
    flex: 1,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },

  // Info sections
  section: {
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    margin: spacing.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
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
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.background.card,
  },
  sectionTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  sectionContent: {
    padding: spacing.lg,
  },
  infoText: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
  },

  // Photo gallery
  imageList: {
    paddingVertical: spacing.md,
  },
  image: {
    width: 280,
    height: 180,
    borderRadius: layout.borderRadius.md,
    marginHorizontal: spacing.sm,
  },

  // Memo display
  memoContainer: {
    backgroundColor: colors.primary[50],
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    margin: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[400],
  },
  memoText: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    lineHeight: typography.size.md * 1.5,
  },

  // Action buttons container
  actionContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary[500],
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  secondaryButton: {
    backgroundColor: colors.secondary[100],
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  deleteButton: {
    backgroundColor: colors.status.error,
    marginTop: spacing.sm,
  },
  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.white,
  },
  secondaryButtonText: {
    color: colors.primary[700],
  },
});
