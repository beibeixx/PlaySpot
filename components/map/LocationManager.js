import { Button, StyleSheet, Text, View, Image, ActivityIndicator} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
import { useRoute } from "@react-navigation/native";
import { auth } from "../../firebase/firebaseSetup";
import { getAddressById } from "../../services/dataService";
import { getLocationFromAddress } from "../../services/geocodingService";

export default function LocationManager({selectedPlace}) {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const route = useRoute();
  const address = selectedPlace? getAddressById(selectedPlace) : getAddressById(route.params.itemID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getLocationFromAddress(address);
        setLocation(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    if (address) {
      fetchData();
    }
  }, [selectedPlace]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.data.latitude},${location.data.longitude}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.data.latitude},${location.data.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API}`,
          }}
          style={styles.map}
          alt="Preview of the image taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 200,
  },
});
