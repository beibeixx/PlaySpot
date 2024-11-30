import {
  Text,
  View,
  Alert,
  Modal,
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
import { colors } from "../../styles/helper/colors";

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
        <PressableButton
          componentStyle={{ flex: 1 }}
          pressHandler={handleCloseModal}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <PressableButton
              componentStyle={playgroundMapStyles.modalContainer}
              pressHandler={(e) => e.stopPropagation()}
            >
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

                <View style={playgroundMapStyles.descriptionContainer}>
                  <Text style={playgroundMapStyles.descriptionText}>
                    {selectedPlayground?.description}
                  </Text>
                </View>

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
            </PressableButton>
          </View>
        </PressableButton>
      </Modal>
    </View>
  );
}
