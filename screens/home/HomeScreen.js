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
import FilterBar from "../../components/home/FilterBar";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const categories = [...new Set(data.map((item) => item.category))];

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

  const filterData = (search, filter) => {
    let result = data;
    
    // 应用搜索过滤
    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // 应用属性过滤
    if (filter !== 'all') {
      result = result.filter((item) => {
        switch (filter) {
          case 'has_swings':
            return item.features['Swings'] !== 'no' || item.features['Baby Swings'] !== 'no';
          case 'has_sandbox':
            return item.features['Sandbox'] !== 'no';
          case 'has_washroom':
            return item.amenities['Washrooms'] !== 'no';
          case 'has_water':
            return item.amenities['Water Fountain'] !== 'no';
          case 'is_shaded':
            return item.environment['Shade'] !== 'no';
          case 'is_fenced':
            return item.environment['Fenced'] !== 'no';
          default:
            return true;
        }
      });
    }
    
    setFilteredData(result);
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
    setSearchText(search);
    filterData(search, selectedFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    filterData(searchText, filter);
  };

  return (
    <View>
      <SearchBar onSearch={handleSearch} />
      <FilterBar
        selectedFilter={selectedFilter}
        onSelectFilter={handleFilterSelect}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
