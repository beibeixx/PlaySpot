// FavoriteItemsList for FavoriteList Screen
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { getItemImageById, getItemNameById } from "../../services/dataService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PressableButton from "../common/PressableButton";
import commonStyles from "../../utils/style";
import { favoriteItemStyles } from "../../styles/components/favoriteItem";

export default function FavoriteItemsList({
  playgroundItem,
  navigation,
  removeHandler,
}) {
  const handleRemove = () => {
    removeHandler(playgroundItem.id);
  };

  const handlePress = () => {
    navigation.navigate("Playground Details", {
      itemID: playgroundItem.playgroundID,
    });
  };

  return (
    <View style={favoriteItemStyles.container}>
      <PressableButton
        pressHandler={handlePress}
        componentStyle={commonStyles.contentContainer}
      >
        <View style={favoriteItemStyles.contentContainer}>
          <View style={favoriteItemStyles.imageContainer}>
            <Image
              source={{ uri: getItemImageById(playgroundItem.playgroundID) }}
              style={favoriteItemStyles.image}
              resizeMode="cover"
            />
          </View>

          <View style={favoriteItemStyles.infoContainer}>
            <Text style={favoriteItemStyles.name}>
              {getItemNameById(playgroundItem.playgroundID)}
            </Text>
          </View>

          <PressableButton
            pressHandler={handleRemove}
            componentStyle={favoriteItemStyles.removeButton}
          >
            <MaterialCommunityIcons
              name="heart-remove"
              size={24}
              style={favoriteItemStyles.removeIcon}
            />
          </PressableButton>
        </View>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({});
