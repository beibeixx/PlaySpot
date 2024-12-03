import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";
import { typography } from "../../styles/helper/typography";

const screenHeight = Dimensions.get("window").height;

export const addMemoryPhotoStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  contentContainer: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    height: screenHeight * 0.75,
    paddingTop: spacing.lg,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.neutral[300],
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
  },
  imageSection: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  actionContainer: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: Platform.OS === "ios" ? spacing.xxxl : spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.card,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    paddingVertical: Platform.OS === "ios" ? spacing.md : spacing.sm,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    paddingVertical: Platform.OS === "ios" ? spacing.md : spacing.sm,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    textAlign: "center",
  },
  cancelButtonText: {
    color: colors.text.primary,
  },
  submitButtonText: {
    color: colors.text.white,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
});
