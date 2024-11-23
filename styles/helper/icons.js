export const iconNames = {
  Amenities: {
    name: "water-pump",
  },
  Features: {
    name: "star-outline",
  },
  Environment: {
    name: "tree-outline",
  },
  default: {
    name: "information-outline",
  },
};

export const getIconNames = (title) => {
  return iconNames[title] || iconNames.default;
};
