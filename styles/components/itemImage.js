// Styles for images components on list pages
import { StyleSheet, Dimensions } from "react-native";
import { cardStyles } from "./card";

export const itemImageStylesPlan = StyleSheet.create({
  imageContainer: {
    height: 80,
    ...cardStyles.imageContainer,
  },
  image: cardStyles.image,
});

export const itemImageStylesMemory = StyleSheet.create({
  imageContainer: {
    height: '200',
    ...cardStyles.imageContainer,
  },
  image: cardStyles.image,
});
