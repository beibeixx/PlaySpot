import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import dataService, { fetchData } from "../../services/dataService";
import SearchBar from "../../components/home/SearchBar";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const items = fetchData();
      setData(items);
      setFilteredData(items);
    } catch (err) {
      console.log("Fetch data error", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Playground Details", { itemID: item.id })
        }
      >
        <View>
          <Image
            source={{ uri: item.images[0] }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const handleSearch = (search) => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  };

  return (
    <View>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
