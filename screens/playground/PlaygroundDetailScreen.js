import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getItemById } from "../../services/dataService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PressableButton from "../../components/common/PressableButton";
import { deleteFromDB, writeToDB } from "../../firebase/firestoreHelper";
import { onSnapshot } from "firebase/firestore";
import { query, where, collection } from "firebase/firestore";
import { auth, database } from "../../firebase/firebaseSetup";

export default function PlaygroundDetailScreen({ navigation, route }) {
  const [data, setData] = useState(null);
  const { itemID } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const checkFavoriteStatus = onSnapshot(
      query(
        collection(database, "favorites"),
        where("playgroundID", "==", itemID)
      ),
      (querySnapshot) => {
        const isFavoriteInDB = !querySnapshot.empty;
        setIsFavorite(isFavoriteInDB);
        setFavoriteId(isFavoriteInDB ? querySnapshot.docs[0].id : null);
      },
      (err) => {
        console.log("check favorite error", err);
      }
    );
    return () => checkFavoriteStatus();
  }, [itemID]);

  const favoriteHandler = useCallback(async () => {
    try {
      if (auth.currentUser) {
        if (isFavorite) {
          const remove = await deleteFromDB(favoriteId, "favorites");
          Alert.alert("Removed from favorites!");
        } else {
          const favoriteData = {
            playgroundID: itemID,
            addedAt: new Date().toISOString(),
          };
          const add = await writeToDB(favoriteData, "favorites");
          Alert.alert("Added to favorites!");
        }
      } else {
        handleLogin();
      }
    } catch (err) {
      console.log("Favorite Button error", err);
    }
  }, [itemID, isFavorite, favoriteId]);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.iconStyle} onPress={favoriteHandler}>
          <MaterialIcons name="favorite-border" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [itemID, favoriteHandler]);

  useEffect(() => {
    const data = getItemById(itemID);
    // console.log(data)
    setData(data);
  }, [itemID]);

  if (!data) {
    return <ActivityIndicator size="large" />;
  }

  const renderSection = (data, title) => {
    const items = Object.entries(data)
      .filter(
        ([_, value]) =>
          value.toLowerCase() !== "no" && value.toLowerCase() !== "unknown"
      )
      .map(([key, value]) => (
        <Text key={key}>
          • {key}: {value}
        </Text>
      ));

    if (items.length === 0) {
      return (
        <View>
          <Text>{title}</Text>
          <Text>• Not Available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>{title}</Text>
        {items}
      </View>
    );
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: data.images[0] }}
        style={{ width: "100%", height: 200 }}
      />
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
      <Text>{data.address}</Text>
      {renderSection(data.amenities, "Available Amenities")}
      {renderSection(data.features, "Available Features")}
      {renderSection(data.environment, "Environment")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    opacity: 0.9,
  },
});
