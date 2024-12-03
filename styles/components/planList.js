// Styles for Planlist components for Plan Screen
import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { typography } from "../helper/typography";
import { cardStyles } from "./card";


export const planListStyles = StyleSheet.create({
  listContainer: cardStyles.listContainer,
  planCard: cardStyles.cardContainer,
  cardContent: {
    padding: spacing.sm,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: spacing.sm,
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
