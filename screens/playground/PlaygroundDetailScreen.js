//Playground detail page to display specific data from reference Playground json file
import { ScrollView, Text, View, Image, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getItemById } from "../../services/dataService";
import PressableButton from "../../components/common/PressableButton";
import { deleteFromDB, writeToDB } from "../../firebase/firestoreHelper";
import { onSnapshot } from "firebase/firestore";
import { query, where, collection } from "firebase/firestore";
import { auth, database } from "../../firebase/firebaseSetup";
import { detailStyles } from "../../styles/screens/playgroundDetails";
import { getSectionColors, colors } from "../../styles/helper/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import LocationManager from "../../components/map/LocationManager";
import { LinearGradient } from "expo-linear-gradient";
import { getIconNames } from "../../styles/helper/icons";
import CommonActivityIndicator from "../../components/common/CommonActivityIndicator";

export default function PlaygroundDetailScreen({ navigation, route }) {
  const [data, setData] = useState(null);
  const { itemID } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const data = getItemById(itemID);
    setData(data);
  }, [itemID]);

  useEffect(() => {
    if (!isAuthenticated || !auth.currentUser) {
      setIsFavorite(false);
      return;
    }
    const checkFavoriteStatus = onSnapshot(
      query(
        collection(database, "favorites"),
        where("owner", "==", auth.currentUser.uid),
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
  }, [itemID, isAuthenticated]);

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
            owner: auth.currentUser.uid,
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
  }, [itemID, isFavorite, favoriteId, isAuthenticated]);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          componentStyle={detailStyles.headerButton}
          pressHandler={favoriteHandler}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={colors.primary[500]}
          />
        </PressableButton>
      ),
    });
  }, [itemID, favoriteHandler]);

  if (!data) {
    return <CommonActivityIndicator />;
  }

  const renderSection = (sectionData, title) => {
    const colors = getSectionColors(title);
    const items = Object.entries(sectionData)
      .filter(
        ([_, value]) =>
          value.toLowerCase() !== "no" && value.toLowerCase() !== "unknown"
      )
      .map(([key, value]) => (
        <View style={detailStyles.featureItem} key={key}>
          <View style={detailStyles.featureKeyContainer}>
            <MaterialCommunityIcons
              name={getIconNames(title).name}
              size={20}
              color={colors.iconColor}
              style={detailStyles.featureIcon}
            />
            <Text style={detailStyles.featureKey}>{key}</Text>
          </View>

          <Text
            style={[detailStyles.featureValue, { color: colors.iconColor }]}
          >
            {value}
          </Text>
        </View>
      ));

    return (
      <View
        style={[
          detailStyles.section,
          { backgroundColor: colors.backgroundColor },
        ]}
      >
        <Text style={[detailStyles.sectionTitle, { color: colors.iconColor }]}>
          {title}
        </Text>
        {items.length > 0 ? (
          <View style={detailStyles.featureContainer}>{items}</View>
        ) : (
          <View
            style={[
              detailStyles.emptyContainer,
              { backgroundColor: colors.emptyBg },
            ]}
          >
            <MaterialCommunityIcons
              name={getIconNames(title).name}
              size={24}
              color={colors.iconColor}
            />
            <Text style={[detailStyles.emptyText, { color: colors.iconColor }]}>
              No {title.toLowerCase()} information available
            </Text>
          </View>
        )}
      </View>
    );
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
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)"]}
            style={detailStyles.gradient}
          />
        </View>

        <View style={detailStyles.contentContainer}>
          <View style={detailStyles.headerCard}>
            <Text style={detailStyles.title}>{data.name}</Text>
            <Text style={detailStyles.description}>{data.description}</Text>
          </View>

          <View style={detailStyles.locationContainer}>
            <LocationManager />
            <View style={detailStyles.addressContainer}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={colors.primary[500]}
              />
              <Text style={detailStyles.address}>{data.address}</Text>
            </View>
          </View>

          {renderSection(data.amenities, "Amenities")}
          {renderSection(data.features, "Features")}
          {renderSection(data.environment, "Environment")}
        </View>
      </ScrollView>
    </View>
  );
}
