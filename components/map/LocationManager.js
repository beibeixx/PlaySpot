import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
import { useRoute } from "@react-navigation/native";
import { getAddressById } from "../../services/dataService";
import { getLocationFromAddress } from "../../services/geocodingService";
import { locationManagerStyles } from "../../styles/components/locationManager";
import CommonActivityIndicator from "../common/CommonActivityIndicator";

export default function LocationManager({ selectedPlace }) {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const route = useRoute();
  const address = selectedPlace
    ? getAddressById(selectedPlace)
    : getAddressById(route.params.itemID);

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
    return () => {
      setLocation(null);
      setLoading(true);
    };
  }, [selectedPlace]);

  if (loading) {
    return <CommonActivityIndicator />;
  }

  return (
    <View style={locationManagerStyles.container}>
      {location && (
        <View style={locationManagerStyles.mapContainer}>
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.data.latitude},${location.data.longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.data.latitude},${location.data.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API}`,
            }}
            style={locationManagerStyles.map}
            alt="Preview of the image taken"
          />
        </View>
      )}
    </View>
  );
}
