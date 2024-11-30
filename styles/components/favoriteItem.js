import { StyleSheet, Platform } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";
import { typography } from "../../styles/helper/typography";

export const favoriteItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: layout.borderRadius.lg,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  name: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  removeButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    padding: spacing.xs,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.full,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  removeIcon: {
    color: colors.status.error,
  },
});
