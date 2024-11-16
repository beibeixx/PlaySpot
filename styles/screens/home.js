import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

const screenWidth = Dimensions.get("window").width;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.warm,
  },
  searchFilterContainer: {
    backgroundColor: colors.background.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: layout.borderRadius.xl,
    borderBottomRightRadius: layout.borderRadius.xl,
    ...layout.shadow.sm,
  },
  listContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  playgroundCard: {
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
    ...layout.shadow.sm,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  // 标签容器
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  tagText: {
    fontSize: typography.size.xs,
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
  },
});
