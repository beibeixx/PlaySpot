import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../helper/colors';
import { spacing } from '../helper/spacing';
import { layout } from '../helper/layout';
import { typography } from '../helper/typography';

const screenWidth = Dimensions.get('window').width;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.warm,
  },
  searchFilterContainer: {
    backgroundColor: colors.background.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...layout.shadow.lg,
    marginBottom: spacing.md,
  },
  searchFilterInner: {
    paddingHorizontal: spacing.lg,
  },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  playgroundCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 24,
    ...layout.shadow.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: spacing.lg,

  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  tagText: {
    fontSize: typography.size.xs,
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
  },
});
