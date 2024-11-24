//reusable colors
export const colors = {
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  secondary: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED",
    700: "#6D28D9",
    800: "#5B21B6",
    900: "#4C1D95",
  },

  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  status: {
    success: "#059669",
    warning: "#D97706",
    error: "#DC2626",
    info: "#3B82F6",
  },

  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    card: "#FFFFFF",
    highlight: "#EFF6FF",
    tag: "#F3F4F6",
    input: "#F3F4F6",
  },

  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    white: "#FFFFFF",
    link: "#3B82F6",
    placeholder: "#9CA3AF",
  },

  // 边框颜色
  border: {
    light: "#E5E7EB",
    default: "#D1D5DB",
    dark: "#9CA3AF",
  },
};

export const tagColors = {
  Swings: {
    bg: "#EFF6FF",
    text: "#3B82F6",
  },
  Sandbox: {
    bg: "#FEF3C7",
    text: "#D97706",
  },
  "Water Fountain": {
    bg: "#F0FDFF",
    text: "#0891B2",
  },
  Washrooms: {
    bg: "#ECFDF5",
    text: "#059669",
  },
  Shade: {
    bg: "#F5F3FF",
    text: "#7C3AED",
  },
  Fenced: {
    bg: "#FCE7F3",
    text: "#DB2777",
  },
  default: {
    bg: "#F3F4F6",
    text: "#6B7280",
  },
};

export const sectionColors = {
  Amenities: {
    backgroundColor: colors.primary[50],
    iconColor: colors.primary[500],
    emptyBg: colors.primary[100],
  },
  Features: {
    backgroundColor: colors.secondary[50],
    iconColor: colors.secondary[500],
    emptyBg: colors.secondary[100],
  },
  Environment: {
    backgroundColor: "#ECFDF5",
    iconColor: "#059669",
    emptyBg: "#D1FAE5",
  },
  default: {
    backgroundColor: colors.neutral[50],
    iconColor: colors.neutral[500],
    emptyBg: colors.neutral[100],
  },
};

export const getTagColors = (tagText) => {
  return tagColors[tagText] || tagColors.default;
};

export const getSectionColors = (title) => {
  return sectionColors[title] || sectionColors.default;
};
