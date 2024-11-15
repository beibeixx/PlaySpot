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
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: typography.size.md,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
    color: colors.icon.medium,
  }
});

export const filterBarStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -spacing.xs, // 补偿内部间距
    },
    filterChip: {
      margin: spacing.xs,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: layout.borderRadius.full,
      borderWidth: 1,
    },
    filterChipSelected: {
      backgroundColor: colors.interactive.selected.background,
      borderColor: colors.interactive.selected.primary,
    },
    filterChipUnselected: {
      backgroundColor: colors.background.primary,
      borderColor: colors.neutral[300],
    },
    filterText: {
      fontSize: typography.size.sm,
      fontWeight: typography.weight.medium,
    },
    filterTextSelected: {
      color: colors.interactive.selected.primary,
    },
    filterTextUnselected: {
      color: colors.text.secondary,
    }
  });