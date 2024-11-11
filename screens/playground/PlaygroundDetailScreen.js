import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getItemById } from "../../services/dataService";

export default function PlaygroundDetailScreen({ route }) {
  const [data, setData] = useState(null);
  const { itemID } = route.params;

  useEffect(() => {
    const data = getItemById(itemID);
    // console.log(data)
    setData(data);
  }, [itemID]);

  if (!data) {
    return <ActivityIndicator size="large" />;
  }

  const renderSection = (data, title) => {
    const items = Object.entries(data)
      .filter(([_, value]) => value.toLowerCase() !== "no" && value.toLowerCase() !== "unknown")
      .map(([key, value]) => (
        <Text key={key}>
          • {key}: {value}
        </Text>
      ));

    if (items.length === 0) return null;

    return (
      <View>
        <Text>{title}</Text>
        {items}
      </View>
    );
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: data.images[0] }}
        style={{ width: "100%", height: 200 }}
      />
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
      <Text>{data.address}</Text>
      {renderSection(data.amenities, "Available Amenities")}
      {renderSection(data.features, "Available Features")}
      {renderSection(data.environment, "Environment")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
