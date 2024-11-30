import { StyleSheet, Platform } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";
import { typography } from "../../styles/helper/typography";

export const memoCardStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
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
    alignSelf: 'center',
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
  },
  inputContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  input: {
    height: 120,
    backgroundColor: colors.background.input,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.size.md,
    color: colors.text.primary,
    textAlignVertical: 'top',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  cancelButtonText: {
    color: colors.text.primary,
  },
  submitButtonText: {
    color: colors.text.white,
  },
});