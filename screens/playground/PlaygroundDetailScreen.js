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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PressableButton from "../../components/common/PressableButton";

export default function PlaygroundDetailScreen({ navigation, route }) {
  const [data, setData] = useState(null);
  const { itemID } = route.params;

  const favoriteHandler = () => {
    return;
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          componentStyle={styles.iconStyle}
          pressedHandler={favoriteHandler}
        >
          <MaterialIcons name="favorite-border" size={24} color="black" />
        </PressableButton>
      ),
    });
  }, []);

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
      .filter(
        ([_, value]) =>
          value.toLowerCase() !== "no" && value.toLowerCase() !== "unknown"
      )
      .map(([key, value]) => (
        <Text key={key}>
          • {key}: {value}
        </Text>
      ));

    if (items.length === 0) {
      return (
        <View>
          <Text>{title}</Text>
          <Text>• Not Available</Text>
        </View>
      );
    }

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

const styles = StyleSheet.create({
  iconStyle: {
    opacity: 0.9,
  },
});
