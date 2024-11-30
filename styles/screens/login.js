import { StyleSheet, Platform } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contentContainer: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  // Header section
  headerContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.lg,
    tintColor: colors.primary[500],
  },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },

  // Input section
  inputContainer: {
    gap: spacing.lg,
  },
  inputWrapper: {
    gap: spacing.xs,
  },
  inputLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  input: {
    height: 48,
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: layout.borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.size.md,
    color: colors.text.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    fontSize: typography.size.sm,
    color: colors.status.error,
    marginLeft: spacing.xs,
  },

  // Forgot password
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: spacing.xs,
  },
  forgotPasswordButton: {
    padding: spacing.xs,
  },
  forgotPasswordText: {
    fontSize: typography.size.sm,
    color: colors.primary[500],
    fontWeight: typography.weight.medium,
  },

  // Action buttons
  buttonsContainer: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  loginButton: {
    backgroundColor: colors.primary[500],
    height: 48,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  registerButton: {
    backgroundColor: colors.secondary[500],
    height: 48,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.white,
  },
});
