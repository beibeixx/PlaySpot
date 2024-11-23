import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";
import { cardStyles } from "../components/card";

const screenWidth = Dimensions.get("window").width;

export const favoriteStyles = StyleSheet.create({
  emptyContainer: cardStyles.emptyContainer,
  emptyText: cardStyles.emptyText,
});
