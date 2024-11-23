import { Button, StyleSheet, Text, View, Modal, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import playgrounds from '../../data/playgrounds.json'
import { getLocationFromAddress } from '../../services/geocodingService'
import Card from '../../components/common/Card'

export default function PlaygroundMap( {navigation}) {
  const [selectedPlayground, setSelectedPlayground] = useState(null);
  const [playgroundLocations, setPlaygroundLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialRegion, setInitialRegion] = useState(null);

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
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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