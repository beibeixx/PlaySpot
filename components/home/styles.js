import { StyleSheet } from 'react-native';
import { colors } from '../../styles/helper/colors';
import { spacing } from '../../styles/helper/spacing';
import { layout } from '../../styles/helper/layout';
import { typography } from '../../styles/helper/typography';

export const searchBarStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: layout.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    paddingHorizontal: spacing.lg,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: typography.size.md,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  searchIcon: {
    color: colors.primary[400],

  }
  
});

export const filterBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: -spacing.xs,
        paddingHorizontal: spacing.xs,
    },
    scrollContent: {
        paddingRight: spacing.lg,
      },
    filterChip: {
        marginHorizontal: spacing.xxs,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: layout.borderRadius.full,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
    },
    filterChipSelected: {
        backgroundColor: colors.primary[500],
        borderColor: colors.primary[500],
        ...layout.shadow.sm,
    },
    filterChipUnselected: {
        backgroundColor: colors.background.primary,
        borderColor: colors.neutral[200],
    },
    filterText: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
    },
    filterTextSelected: {
        color: colors.text.white,

    },
    filterTextUnselected: {
      color: colors.text.secondary,
    },
    icon: {
        marginRight: spacing.xs,
    },
  });