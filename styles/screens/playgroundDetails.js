import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

const { width } = Dimensions.get("window");

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  imageContainer: {
    width: "100%",
    height: width * 0.7,
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    right: spacing.lg,
    bottom: -spacing.xl,
    backgroundColor: colors.background.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    ...layout.shadow.md,
  },
  favoriteIcon: {
    color: colors.primary[500],
  },
  favoriteIconActive: {
    color: colors.primary[500],
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.md,
  },
  titleContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  address: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.size.md,
    color: colors.text.primary,
    lineHeight: typography.size.md * 1.5,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  featureList: {
    backgroundColor: colors.background.secondary,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  featureText: {
    fontSize: typography.size.md,
    color: colors.text.primary,
    flex: 1,
  },
  featureValue: {
    fontSize: typography.size.sm,
    color: colors.primary[500],
    fontWeight: typography.weight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.md,
  },
  envCard: {
    flexDirection: "row",
    backgroundColor: colors.secondary[50],
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  envIcon: {
    marginRight: spacing.md,
    color: colors.secondary[500],
  },
  envInfo: {
    flex: 1,
  },
  envTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  envValue: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
});
