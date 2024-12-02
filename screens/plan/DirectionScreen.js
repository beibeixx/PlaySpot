import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { getItemNameById, getAddressById } from '../../services/dataService';
import { getLocationFromAddress } from '../../services/geocodingService';
import { playgroundMapStyles } from '../../styles/screens/playgroundMap';
import DirectionFilter from '../../components/map/DirectionFilter';

export default function DirectionScreen( { route }) {
  const [initialRegion, setInitialRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyAbXfKFGsPHHEnG0sLTkMJ_dy3COejz-tw";
  const { playgroundId } = route.params;
  const [mood, setMood] = useState('DRIVING');
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && initialRegion && destination) {
      mapRef.current.fitToCoordinates(
        [initialRegion, destination],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [initialRegion, destination]);
  
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

    const fetchPlaygroundLocation = async () => {
      try {
        const address = getAddressById(playgroundId);
        const result = await getLocationFromAddress(address);
        if (result.success && result.data) {
          setDestination(result.data);
        }
      } catch (error) {
        console.error("Error fetching playground location:", error);
      }
    }
    fetchUserLocation();
    fetchPlaygroundLocation();
  }, [playgroundId]);

  function handleFilterSelect(filter) {
    console.log('Selected filter:', filter);
    setMood(filter);
  }

  return (
    <View style={playgroundMapStyles.container}>
      <View style={playgroundMapStyles.filterContainer}>
      <DirectionFilter selectedFilter={mood} onSelectFilter={handleFilterSelect}/>
      </View>
      {initialRegion && destination && (
        <MapView
        ref={mapRef}
        style={playgroundMapStyles.map}
        showsUserLocation
        showsMyLocationButton
        initialRegion={initialRegion}
      >
        <Marker 
          coordinate={destination}
          title={getItemNameById(playgroundId)}
          />
        <Marker
          coordinate={initialRegion}
          title="Your Location"
        /> 
        <MapViewDirections
          language='en'
          origin={initialRegion}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          resetOnChange={false}
          mode={mood}
          strokeColor="hotpink"
          onReady={result => {
            console.log('Distance: ', result.distance);
            console.log('Duration: ', result.duration);
          }}
          onError={(errorMessage) => {
            console.log('Error getting directions:', errorMessage);
            Alert.alert('Error', 'Failed to get directions. Please try again.');
          }}
        />
      </MapView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})