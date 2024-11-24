import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Alert, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import playgrounds from '../../data/playgrounds.json'
import { getLocationFromAddress } from '../../services/geocodingService'
import Card from '../../components/common/Card'
import PressableButton from '../../components/common/PressableButton'
import commonStyles from '../../utils/style'

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
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
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
        console.error('Error fetching user location:', error);
      }
    };

    const fetchPlaygroundLocations = async () => {
      try {
        const locations = await Promise.all(
          playgrounds.map(async (playground) => {
            console.log('Fetching location for:', playground.address);
            const result = await getLocationFromAddress(playground.address);
            if (result.success && result.data && result.data.latitude && result.data.longitude) {
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
      setPlaygroundLocations(locations.filter((location) => location !== null));
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
    console.log('Selected playground:', selectedPlayground);
    console.log('Select handler:', selectHandler);
    if (selectHandler) {
    selectHandler(selectedPlayground);
    setSelectedPlayground(null);
    navigation.goBack();
    }
  }
  
  if (loading || !initialRegion) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
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
          />
        ))}
      </MapView>
      {selectedPlayground && (
        <Card 
          isVisible={selectedPlayground !== null}
          onBack={handleCloseModal}>  
          <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPlayground.name}</Text>
              <Text>{selectedPlayground.address}</Text>
              <Text>{selectedPlayground.description}</Text>
              <View style={commonStyles.buttonContainer}>
              <PressableButton 
                pressHandler={handleCloseModal}
                componentStyle={commonStyles.cancelButton}>
              <Text>Cancel</Text>
              </PressableButton>
              <PressableButton 
                pressHandler={handleSelectPlayground}
                componentStyle={commonStyles.editButton}>
              <Text>Select</Text>
              </PressableButton>
              </View>
            </View>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})