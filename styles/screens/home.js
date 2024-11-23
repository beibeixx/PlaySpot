import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";
import { cardStyles } from "../components/card";

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
  listContainer: cardStyles.listContainer,
  playgroundCard: {
    paddingBottom: spacing.sm,
    ...cardStyles.cardContainer,
  },
  imageContainer: {
    height: 150,
    ...cardStyles.imageContainer,
  },
  image: cardStyles.image,
  cardContent: {
    padding: spacing.xs,
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
