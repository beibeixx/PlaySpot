import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/helper/colors";
import { filterBarStyles } from "./styles";

export default function FilterBar({ selectedFilter, onSelectFilter }) {
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "has_swings", label: "Swings" },
    { id: "has_sandbox", label: "Sandbox" },
    { id: "has_washroom", label: "Washrooms" },
    { id: "has_water", label: "Water Fountain" },
    { id: "is_shaded", label: "Shade" },
    { id: "is_fenced", label: "Fenced" },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={filterBarStyles.container}
      contentContainerStyle={filterBarStyles.scrollContent}

    >
      {filterOptions.map((option) => (
        <Pressable
          key={option.id}
          style={[
            filterBarStyles.filterChip,
            selectedFilter === option.id
              ? filterBarStyles.filterChipSelected
              : filterBarStyles.filterChipUnselected,
          ]}
          onPress={() => onSelectFilter(option.id)}
        >
          <MaterialCommunityIcons
            name={option.icon}
            size={16}
            color={
              selectedFilter === option.id
                ? colors.text.white
                : colors.text.secondary
            }
            style={filterBarStyles.icon}
          />
          <Text
            style={[
              filterBarStyles.filterText,
              selectedFilter === option.id
                ? filterBarStyles.filterTextSelected
                : filterBarStyles.filterTextUnselected,
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
