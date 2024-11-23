import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { getItemImageById } from "../../services/dataService";
import { itemImageStyles } from "../../styles/components/itemImage";

export default function ItemImage({ id }) {
  const imageUri = getItemImageById(id);
  return (
    <View style={itemImageStyles.imageContainer}>
      <Image source={{ uri: imageUri }} style={itemImageStyles.image} />
    </View>
  );
}

const styles = StyleSheet.create({});
