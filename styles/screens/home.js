import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

const screenWidth = Dimensions.get("window").width;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[100],
  },
  searchFilterContainer: {
    backgroundColor: colors.secondary[50],
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    borderBottomLeftRadius: layout.borderRadius.sm,
    borderBottomRightRadius: layout.borderRadius.sm,
    ...layout.shadow.sm,
  },
  listContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  playgroundCard: {
    backgroundColor: colors.primary[50],
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
    paddingBottom: spacing.sm,
    ...layout.shadow.sm,
  },
  imageContainer: {
    width: "100%",
    height: 150,
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
    color: colors.neutral[800],
    paddingLeft: spacing.xs,
    paddingTop: spacing.xxs,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs,
    paddingLeft: spacing.xxs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: layout.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.secondary[100],
  },
  tagText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
});
