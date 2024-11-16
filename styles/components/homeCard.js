import { StyleSheet } from 'react-native';
import { colors } from '../helper/colors';
import { spacing } from '../helper/spacing';
import { layout } from '../helper/layout';

export const cardStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.md,
    ...layout.shadow.sm,
  },
  interactive: {
    backgroundColor: colors.background.primary,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    ...layout.shadow.sm,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  }
});