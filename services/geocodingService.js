// Google Map API to handle the helper functions for location features like 
//transfer the address to latitude & longitude
import AsyncStorage from "@react-native-async-storage/async-storage";

const formatAddress = (address) => {
  if (!address) return "";

  // Plus Code
  if (address.toUpperCase().includes("PLUS CODE")) {
    const plusCodeMatch = address.match(/PLUS CODE: ([A-Z0-9]+\+[A-Z0-9]+)/i);
    const cityMatch = address.match(/,\s*([^,]+)$/);
    const plusCode = plusCodeMatch ? plusCodeMatch[1].trim() : "";
    const cityInfo = cityMatch ? cityMatch[1].trim() : "";
    return `${plusCode} ${cityInfo}`.trim();
  }

  return address
    .trim()
    .replace(/\s+/g, " ")
    .replace(/,\s+/g, ", ")
    .replace(/\s+,/g, ",");
};

export const getCoordinatesGoogle = async (address) => {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API;
  try {
    const formattedAddress = formatAddress(address);
    console.log("Formatted address:", formattedAddress);

    const cacheKey = `geocode_${formattedAddress}`;
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        // console.log("Cache hit:", cachedData);
        return cachedData;
      }
    } catch (cacheError) {
      console.log("Cache error:", cacheError);
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      formattedAddress
    )}&region=ca&key=${API_KEY}`;

    console.log("Fetching from:", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API response:", data);

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const result = {
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
        formattedAddress: data.results[0].formatted_address,
        addressComponents: data.results[0].address_components,
        placeId: data.results[0].place_id,
        locationType: data.results[0].geometry.location_type,
        confidence:
          data.results[0].geometry.location_type === "ROOFTOP"
            ? "HIGH"
            : "MEDIUM",
      };

      try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (cacheError) {
        console.log("Cache save error:", cacheError);
      }

      return result;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

export const getLocationFromAddress = async (address) => {
  try {
    if (!address || typeof address !== "string") {
      throw new Error("invalid address");
    }

    const location = await getCoordinatesGoogle(address);

    return {
      success: true,
      data: location,
    };
  } catch (error) {
    console.error("Location search error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
