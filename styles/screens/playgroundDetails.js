//Styles for PlaygroundDetails Screen
import { StyleSheet } from "react-native";
import { colors } from "../helper/colors";
import { spacing } from "../helper/spacing";
import { layout } from "../helper/layout";
import { typography } from "../helper/typography";


export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    backgroundColor: colors.background.secondary,
    paddingBottom: spacing.xl,
  },
  headerCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: layout.borderRadius.lg,
    ...layout.shadow.sm,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: typography.size.md * 1.4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.xxs,
  },
  address: {
    fontSize: typography.size.sm,
    color: colors.text.tertiary,
  },
  locationContainer: {
    margin: spacing.lg,
    marginTop: 0,
  },
  section: {
    margin: spacing.lg,
    marginTop: 0,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.lg,
    ...layout.shadow.sm,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  featureContainer: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  featureKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  featureIcon: {
    opacity: 0.8,
  },
  featureKey: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
  },
  featureValue: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    flex: 1,
    marginLeft: spacing.md,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xs,
    borderRadius: layout.borderRadius.md,
  },
  emptyText: {
    fontSize: typography.size.sm,
    textAlign: 'center',
    fontWeight: typography.weight.medium,
  },
  headerButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
