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
import PressableButton from "../../components/common/PressableButton";
import commonStyles from "../../utils/style";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

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
    if (filter !== "all") {
      result = result.filter((item) => {
        switch (filter) {
          case "has_swings":
            return (
              item.features["Swings"] !== "no" ||
              item.features["Baby Swings"] !== "no"
            );
          case "has_sandbox":
            return item.features["Sandbox"] !== "no";
          case "has_washroom":
            return item.amenities["Washrooms"] !== "no";
          case "has_water":
            return item.amenities["Water Fountain"] !== "no";
          case "is_shaded":
            return item.environment["Shade"] !== "no";
          case "is_fenced":
            return item.environment["Fenced"] !== "no";
          default:
            return true;
        }
      });
    }

    setFilteredData(result);
  };

  const renderItem = ({ item }) => {
    return (
      <PressableButton
        pressHandler={() =>
          navigation.navigate("Playground Details", { itemID: item.id })
        }
        componentStyle={commonStyles.itemCard}

      >
        <View>
          <Image
            source={{ uri: item.images[0] }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.name}</Text>
        </View>
      </PressableButton>
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
    <View style={styles.container}>
      <View style={styles.searchFilterContainer}>
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={handleFilterSelect}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchFilterContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listContainer: {
    padding: 10,
  },
});
