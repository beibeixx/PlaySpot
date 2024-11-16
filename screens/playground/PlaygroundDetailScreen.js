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
import PressableButton from "../../components/common/PressableButton";
import { deleteFromDB, writeToDB } from "../../firebase/firestoreHelper";
import { onSnapshot } from "firebase/firestore";
import { query, where, collection } from "firebase/firestore";
import { auth, database } from "../../firebase/firebaseSetup";
import { detailStyles } from "../../styles/screens/playgroundDetails";
import { colors } from "../../styles/helper/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function PlaygroundDetailScreen({ navigation, route }) {
  const [data, setData] = useState(null);
  const { itemID } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth)

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
      if (isAuthenticated) {
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
        <Pressable
          style={({ pressed }) => [
            detailStyles.headerButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={favoriteHandler}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={colors.primary[500]}
          />
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

  const renderSection = (data) => {
    const items = Object.entries(data)
      .filter(
        ([_, value]) =>
          value.toLowerCase() !== "no" && value.toLowerCase() !== "unknown"
      )
      .map(([key, value]) => (
        <View style={detailStyles.featureItem} key={key}>
          <Text style={detailStyles.featureText}>{key}</Text>
          <Text style={detailStyles.featureValue}>{value}</Text>
        </View>
      ));

    if (items.length === 0) {
      return (
        <View style={detailStyles.featureList}>
          <Text>N/A</Text>
        </View>
      );
    }

    return <View style={detailStyles.featureList}>{items}</View>;
  };

  return (
    <View style={detailStyles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={detailStyles.imageContainer}>
          <Image
            source={{ uri: data.images[0] }}
            style={detailStyles.image}
            resizeMode="cover"
          />
        </View>
        <View style={detailStyles.content}>
          <View style={detailStyles.titleContainer}>
            <Text style={detailStyles.title}>{data.name}</Text>
            <Text style={detailStyles.address}>{data.description}</Text>
            <Text style={detailStyles.description}>{data.address}</Text>
          </View>
          <Text style={detailStyles.sectionTitle}>Amenities</Text>
            {renderSection(data.amenities)}
          <Text style={detailStyles.sectionTitle}>Features</Text>
          {renderSection(data.features)}

          <Text style={detailStyles.sectionTitle}>Environment</Text>
          {renderSection(data.environment)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    opacity: 0.9,
  },
});
