//Display the weather section on plan details page
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocationFromAddress } from "../../services/geocodingService";
import { weatherSectionStyles } from "../../styles/components/WeatherSection";
import { colors } from "../../styles/helper/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommonActivityIndicator from "../../components/common/CommonActivityIndicator";

export default function WeatherSection({ address, time = null }) {
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
        if (isCurrentWeather) {
          setWeatherData(weatherResult);
        } else {
          const targetTime = new Date(time).getTime();
          const closestForecast = weatherResult.list.reduce((prev, curr) => {
            const prevDiff = Math.abs(
              new Date(prev.dt * 1000).getTime() - targetTime
            );
            const currDiff = Math.abs(
              new Date(curr.dt * 1000).getTime() - targetTime
            );
            return prevDiff < currDiff ? prev : curr;
          });
          setWeatherData(closestForecast);
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
      <CommonActivityIndicator/>
    );
  }

  if (error) {
    return (
      <View style={weatherSectionStyles.container}>
        <Text style={weatherSectionStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  // console.log(weatherData);

  const getWeatherIcon = (description) => {
    // Add more mappings as needed
    const iconMap = {
      "clear sky": "weather-sunny",
      "few clouds": "weather-partly-cloudy",
      "scattered clouds": "weather-cloudy",
      "broken clouds": "weather-cloudy",
      "shower rain": "weather-rainy",
      rain: "weather-pouring",
      thunderstorm: "weather-lightning-rainy",
      snow: "weather-snowy",
      mist: "weather-fog",
    };
    return iconMap[description.toLowerCase()] || "weather-cloudy";
  };

  return (
    <View style={weatherSectionStyles.container}>
      <Text style={weatherSectionStyles.locationText}>
        {locationData?.displayName}
      </Text>
      <View style={weatherSectionStyles.weatherBox}>
        <View style={weatherSectionStyles.mainInfo}>
          <Text style={weatherSectionStyles.temperature}>
            {Math.round(weatherData?.main?.temp)}°
          </Text>
          <MaterialCommunityIcons
            name={getWeatherIcon(weatherData?.weather?.[0]?.description)}
            size={40}
            color={colors.primary[500]}
          />
        </View>
        <View style={weatherSectionStyles.infoContainer}>
          <Text style={weatherSectionStyles.weatherDesc}>
            {weatherData?.weather?.[0]?.description}
          </Text>
          <View style={weatherSectionStyles.detailsContainer}>
            <Text style={weatherSectionStyles.details}>
              {weatherData?.main?.humidity}% humidity
            </Text>
            <Text style={weatherSectionStyles.details}>
              {weatherData?.wind?.speed}m/s
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
