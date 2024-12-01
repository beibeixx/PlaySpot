import {
  Text,
  View,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import playgrounds from "../../data/playgrounds.json";
import { getLocationFromAddress } from "../../services/geocodingService";
import PressableButton from "../../components/common/PressableButton";
import CommonActivityIndicator from "../../components/common/CommonActivityIndicator";
import { playgroundMapStyles } from "../../styles/screens/playgroundMap";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors, getTagColors } from "../../styles/helper/colors";
import { homeStyles } from "../../styles/screens/home";


export default function PlaygroundMap() {
  const [selectedPlayground, setSelectedPlayground] = useState(null);
  const [playgroundLocations, setPlaygroundLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialRegion, setInitialRegion] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const selectHandler = route.params?.selectHandler;

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    const fetchPlaygroundLocations = async () => {
      try {
        const locations = await Promise.all(
          playgrounds.map(async (playground) => {
            console.log("Fetching location for:", playground.address);
            const result = await getLocationFromAddress(playground.address);
            if (
              result.success &&
              result.data &&
              result.data.latitude &&
              result.data.longitude
            ) {
              return {
                ...playground,
                latitude: result.data.latitude,
                longitude: result.data.longitude,
              };
            } else {
              console.error("Error fetching location:", result);
              return null;
            }
          })
        );
        setPlaygroundLocations(
          locations.filter((location) => location !== null)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playground locations:", error);
        setLoading(false);
      }
    };
    fetchUserLocation();
    fetchPlaygroundLocations();
  }, []);

  const handleMarkerPress = (playground) => {
    setSelectedPlayground(playground);
  };

  const handleCloseModal = () => {
    setSelectedPlayground(null);
  };

  function handleSelectPlayground() {
    console.log("Selected playground:", selectedPlayground);
    console.log("Select handler:", selectHandler);
    if (selectedPlayground) {
      navigation.navigate({
        name: "Modify Plan",
        params: { selectedPlayground },
        merge: true,
      });
    }
  }

  if (loading || !initialRegion) {
    return <CommonActivityIndicator />;
  }

  const renderTags = (item) => {
    const tags = [];
    if (
      item.features["Swings"] !== "no" ||
      item.features["Baby Swings"] !== "no"
    )
      tags.push("Swings");
    if (item.features["Sandbox"]) tags.push("Sandbox");
    if (item.amenities["Washrooms"]) tags.push("Washrooms");
    if (item.features["Water Fountain"] !== "no") tags.push("Water Fountain");
    if (item.environment["Shade"]) tags.push("Shade");
    if (item.environment["Fenced"] !== "no") tags.push("Fenced");
    return tags.slice(0, 6).map((tag, index) => {
      const colors = getTagColors(tag);
      return (
        <View
          key={index}
          style={[homeStyles.tag, { backgroundColor: colors.bg }]}
        >
          <Text style={[homeStyles.tagText, { color: colors.text }]}>
            {tag}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={playgroundMapStyles.container}>
      <MapView
        style={playgroundMapStyles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {playgroundLocations.map((playground) => (
          <Marker
            key={playground.id}
            coordinate={{
              latitude: playground.latitude,
              longitude: playground.longitude,
            }}
            title={playground.name}
            onPress={() => handleMarkerPress(playground)}
          >
            <View
              style={[
                playgroundMapStyles.customMarker,
                selectedPlayground?.id === playground.id &&
                  playgroundMapStyles.selectedMarker,
              ]}
            >
              <MaterialIcons
                name="location-pin"
                size={24}
                color={colors.text.white}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedPlayground !== null}
        onRequestClose={handleCloseModal}
      >
        {selectedPlayground && (<View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={playgroundMapStyles.modalContainer}>
            <View style={playgroundMapStyles.handle} />
            <View style={playgroundMapStyles.modalContent}>
              <Text style={playgroundMapStyles.playgroundTitle}>
                {selectedPlayground?.name}
              </Text>

              <View style={playgroundMapStyles.addressContainer}>
                <MaterialIcons
                  name="location-on"
                  size={20}
                  style={playgroundMapStyles.addressIcon}
                />
                <Text style={playgroundMapStyles.addressText}>
                  {selectedPlayground?.address}
                </Text>
              </View>
              
              <View style={playgroundMapStyles.tagsContainer}>{renderTags(selectedPlayground)}</View>

              <ScrollView 
                height={150}
                style={playgroundMapStyles.descriptionContainer}>
                <Text style={playgroundMapStyles.descriptionText}>
                  {selectedPlayground?.description}
                </Text>
              </ScrollView>

              <View style={playgroundMapStyles.actionContainer}>
                <PressableButton
                  pressHandler={handleCloseModal}
                  componentStyle={playgroundMapStyles.cancelButton}
                >
                  <Text
                    style={[
                      playgroundMapStyles.buttonText,
                      playgroundMapStyles.cancelButtonText,
                    ]}
                  >
                    Cancel
                  </Text>
                </PressableButton>

                <PressableButton
                  pressHandler={handleSelectPlayground}
                  componentStyle={playgroundMapStyles.selectButton}
                >
                  <Text
                    style={[
                      playgroundMapStyles.buttonText,
                      playgroundMapStyles.selectButtonText,
                    ]}
                  >
                    Select
                  </Text>
                </PressableButton>
              </View>
            </View>
          </View>
        </View>)}
      </Modal>
    </View>
  );
}
