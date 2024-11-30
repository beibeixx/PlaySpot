// FavoriteItemsList for FavoriteList Screen
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { getItemImageById, getItemNameById } from "../../services/dataService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PressableButton from "../common/PressableButton";
import commonStyles from "../../utils/style";

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
    <View>
      <PressableButton
        pressHandler={handlePress}
        componentStyle={commonStyles.itemCard}
      >
        <View>
          <Image
            source={{ uri: getItemImageById(playgroundItem.playgroundID) }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{getItemNameById(playgroundItem.playgroundID)}</Text>
        </View>
      </PressableButton>
      <PressableButton pressHandler={handleRemove}>
        <MaterialCommunityIcons
          name="heart-remove-outline"
          size={24}
          color="black"
        />
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({});
