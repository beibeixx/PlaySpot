import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from 'react'
import { filterBarStyles } from "../../styles/components/homeSearch";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function DirectionFilter( {selectedFilter, onSelectFilter}) {
  //FilterBar for Direction screen
  const filterOptions = [
    { id: "DRIVING", label: "Driving", icon: "car" },
    { id: "WALKING", label: "Walking", icon: "walking" },
    { id: "BICYCLING", label: "Bicycling", icon: "biking" },
    { id: "TRANSIT", label: "Transit", icon: "bus-alt" },
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
            selectedFilter === option.id && filterBarStyles.filterChipSelected
          ]}
          onPress={() => onSelectFilter(option.id)}
        >
          <FontAwesome5 name={option.icon} size={20} color="black" />
        </Pressable>
      ))}
    </ScrollView>
  );
}