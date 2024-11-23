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
import { homeStyles } from "../../styles/screens/home";
import { colors, getTagColors } from "../../styles/helper/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

    // Search
    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter
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

  const renderTags = (item) => {
    const tags = [];
    if (
      item.features["Swings"] !== "no" ||
      item.features["Baby Swings"] !== "no"
    )
      tags.push("Swings");
    if (item.features["Sandbox"]) tags.push("Sandbox");
    if (item.amenities["Washrooms"]) tags.push("Washrooms");
    if (item.features["Water Fountain"] !== "no") tags.push("Water Fountain");
    if (item.environment["Shade"]) tags.push("Shade");
    if (item.environment["Fenced"] !== "no") tags.push("Fenced");
    return tags.slice(0, 6).map((tag, index) => {
      const colors = getTagColors(tag);
      return (
        <View
          key={index}
          style={[homeStyles.tag, { backgroundColor: colors.bg }]}
        >
          <Text style={[homeStyles.tagText, { color: colors.text }]}>
            {tag}
          </Text>
        </View>
      );
    });
  };

  const renderItem = ({ item }) => {
    return (
      <PressableButton
        pressHandler={() =>
          navigation.navigate("Playground Details", { itemID: item.id })
        }
        componentStyle={homeStyles.playgroundCard}
      >
        <LinearGradient
          colors={[colors.background.primary, colors.primary[50]]}
        >
          <View style={homeStyles.imageContainer}>
            <Image
              source={{ uri: item.images[0] }}
              style={homeStyles.image}
              resizeMode="cover"
            />
          </View>
          <View style={homeStyles.cardContent}>
            <Text style={homeStyles.title}>{item.name}</Text>
            <View style={homeStyles.tagContainer}>{renderTags(item)}</View>
          </View>
        </LinearGradient>
      </PressableButton>
    );
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
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
    <View style={homeStyles.container}>
      <View style={homeStyles.searchFilterContainer}>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for a playground"
        />
        <FilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={handleFilterSelect}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={homeStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
