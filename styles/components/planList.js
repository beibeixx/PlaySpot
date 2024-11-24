// Styles for Planlist components for Plan Screen
import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";
import { cardStyles } from "./card";

const screenWidth = Dimensions.get("window").width;

export const planListStyles = StyleSheet.create({
  listContainer: cardStyles.listContainer,
  planCard: cardStyles.cardContainer,
  cardContent: {
    padding: spacing.sm,
  },
  planName: {
    marginBottom: spacing.xxs,
    ...cardStyles.title,
  },
  timeText: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  emptyContainer: cardStyles.emptyContainer,
  emptyText: cardStyles.emptyText,
});
