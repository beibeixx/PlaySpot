import { StyleSheet, Dimensions } from "react-native";
import { cardStyles } from "./card";

export const itemImageStyles = StyleSheet.create({
  imageContainer: {
    height: 80,
    ...cardStyles.imageContainer,
  },
  image: cardStyles.image,
});
