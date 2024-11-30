import { StyleSheet } from "react-native";
import { colors } from "../../styles/helper/colors";
import { spacing } from "../../styles/helper/spacing";
import { layout } from "../../styles/helper/layout";
import { typography } from "../../styles/helper/typography";

export const datetimePickerStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  cancelText: {
    fontSize: typography.size.md,
    color: colors.primary[500],
  },
  quickOptionsContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  quickOption: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.full,
    marginRight: spacing.sm,
  },
  quickOptionText: {
    color: colors.primary[600],
    fontSize: typography.size.sm,
  },
  confirmButton: {
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    marginTop: spacing.md,
  },
  confirmText: {
    color: colors.text.white,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
});
