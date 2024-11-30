import { StyleSheet } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";


export const weatherSectionStyles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    ...layout.shadow.sm,
  },
  locationText: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  weatherBox: {
    gap: spacing.md,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  temperature: {
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
    color: colors.primary[700],
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherDesc: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    textTransform: "capitalize",
  },
  detailsContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  details: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  errorText: {
    color: colors.status.error,
    textAlign: "center",
    fontSize: typography.size.sm,
    padding: spacing.md,
  },
});
