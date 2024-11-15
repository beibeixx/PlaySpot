import { StyleSheet } from 'react-native';
import { colors } from '../helper/colors';
import { spacing } from '../helper/spacing';
import { layout } from '../helper/layout';
import { typography } from '../helper/typography';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  searchFilterContainer: {
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  listContainer: {
    padding: spacing.md,
  },
  playgroundCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...layout.shadow.sm,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: layout.borderRadius.sm,
    overflow: 'hidden',
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});
