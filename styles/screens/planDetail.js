//Styles for PlanDetails Screen
import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";

const { width } = Dimensions.get("window");

export const planDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  // Image Header
  imageContainer: {
    height: 250,
    width: "100%",
    position: "relative",
    backgroundColor: colors.neutral[200],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  // Content Container
  contentContainer: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    backgroundColor: colors.background.secondary,
    paddingTop: spacing.lg,
  },
  // Section Styles
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    ...layout.shadow.sm,
  },
  sectionTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  // Location styles
  locationName: {
    fontSize: typography.size.lg,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  mapContainer: {
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: layout.borderRadius.lg,
    borderBottomRightRadius: layout.borderRadius.lg,
  },
  // Time styles
  timeText: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  // Weather section
  weatherContainer: {
    marginBottom: spacing.lg,
  },
  weatherTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  warningText: {
    fontSize: typography.size.sm,
    color: colors.status.info,
    backgroundColor: colors.primary[50],
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
  },
  // Button styles
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.status.error,
    paddingVertical: spacing.md,
    borderRadius: layout.borderRadius.md,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    paddingVertical: spacing.md,
    borderRadius: layout.borderRadius.md,
  },
  archiveButton: {
    flex: 1,
    backgroundColor: colors.secondary[500],
    paddingVertical: spacing.md,
    borderRadius: layout.borderRadius.md,
  },
  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.text.white,
    textAlign: "center",
  },
});
