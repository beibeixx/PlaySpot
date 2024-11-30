import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";

const screenWidth = Dimensions.get("window").width;

const ITEM_SIZE =
  (screenWidth - spacing.lg * 2 - spacing.xs) / 2;

export const imageManagerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    alignItems: "flex-start",
  },
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.full,
    padding: 2,
    zIndex: 1,
  },
  addButton: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: colors.background.input,
    borderRadius: layout.borderRadius.md,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.border.light,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: colors.primary[500],
  },
});
