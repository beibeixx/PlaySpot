import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";
import { cardStyles } from "../components/card";

const screenWidth = Dimensions.get("window").width;

export const accountStyles = StyleSheet.create({
  container: cardStyles.mainContainer,
  header: {
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: layout.borderRadius.xl,
    borderBottomRightRadius: layout.borderRadius.xl,
    ...layout.shadow.sm,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[300],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
    ...layout.shadow.sm,
  },
  emailText: {
    fontSize: typography.size.md,
    color: colors.background.primary,
    marginBottom: spacing.xxs,
  },
  welcomeText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.background.primary,
  },
  subtitleText: {
    fontSize: typography.size.sm,
    color: colors.primary[100],
    marginTop: spacing.xxs,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  menuContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.lg,
    overflow: "hidden",
    ...layout.shadow.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemDanger: {
    borderBottomWidth: 0,
  },
  menuItemPressed: {
    backgroundColor: colors.background.tertiary,
  },
  menuIcon: {
    marginRight: spacing.sm,
  },
  menuText: {
    fontSize: typography.size.md,
    color: colors.text.primary,
  },
  menuTextDanger: {
    color: colors.status.error,
  },
  menuArrow: {
    opacity: 0.5,
  },
  loginContainer: {
    alignItems: "center",
    padding: spacing.xl,
  },
  loginMessage: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: typography.size.md * 1.4,
    marginBottom: spacing.xl,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary[500],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: layout.borderRadius.full,
    gap: spacing.sm,
    ...layout.shadow.sm,
  },
  loginButtonPressed: {
    backgroundColor: colors.primary[600],
  },
  loginButtonText: {
    color: colors.background.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
});
