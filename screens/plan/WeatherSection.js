//Display the weather section on plan details page
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocationFromAddress } from "../../services/geocodingService";

export default function WeatherSection({ address, time=null}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const WEATHER_API_KEY = process.env.EXPO_PUBLIC_weatherAPI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const location = await getLocationFromAddress(address);
        setLocationData(location);

        const isCurrentWeather = new Date(time) <= new Date();

        let endpoint = isCurrentWeather
          ? `https://api.openweathermap.org/data/2.5//weather?lat=${location.data.latitude}&lon=${location.data.longitude}&appid=${WEATHER_API_KEY}&units=metric`
          : `https://api.openweathermap.org/data/2.5/forecast?lat=${location.data.latitude}&lon=${location.data.longitude}&appid=${WEATHER_API_KEY}&units=metric`;

        const weatherResponse = await fetch(endpoint);
        const weatherResult = await weatherResponse.json();
        if (isCurrentWeather){
          setWeatherData(weatherResult);
        } else {
          const targetTime = new Date(time).getTime();
          const closestForecast = weatherResult.list.reduce((prev, curr) => {
            const prevDiff = Math.abs(new Date(prev.dt * 1000).getTime() - targetTime);
            const currDiff = Math.abs(new Date(curr.dt * 1000).getTime() - targetTime);
            return prevDiff < currDiff ? prev : curr;
          });
          setWeatherData(closestForecast)
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  console.log(weatherData);

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>{locationData?.displayName}</Text>
      <View style={styles.weatherBox}>
        <Text style={styles.temperature}>
          {weatherData?.main?.temp.toFixed(1)}°C
        </Text>
        <Text style={styles.weatherDesc}>
          {weatherData?.weather?.[0]?.description}
        </Text>
        <Text style={styles.details}>
          Humidity: {weatherData?.main?.humidity}%
        </Text>
        <Text style={styles.details}>Wind: {weatherData?.wind?.speed} m/s</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  weatherBox: {
    alignItems: "center",
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 5,
  },
  weatherDesc: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
