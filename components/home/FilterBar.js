import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FilterBar({filters, selectedFilter, onSelectFilter}) {

    const filterOptions = [
        { id: 'all', label: 'All' },
        { id: 'has_swings', label: 'Swings' },
        { id: 'has_sandbox', label: 'Sandbox' },
        { id: 'has_washroom', label: 'Washrooms' },
        { id: 'has_water', label: 'Water Fountain' },
        { id: 'is_shaded', label: 'Shade' },
        { id: 'is_fenced', label: 'Fenced' }
      ];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {filterOptions.map((option) => (
        <Pressable
          key={option.id}
          style={[
            styles.filterButton,
            selectedFilter === option.id && styles.selectedFilter
          ]}
          onPress={() => onSelectFilter(option.id)}
        >
          <Text style={[
            styles.filterText,
            selectedFilter === option.id && styles.selectedFilterText
          ]}>{option.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
      },
      selectedFilter: {
        backgroundColor: '#007AFF',
      },
      filterText: {
        fontSize: 14,
        color: '#333',
      },
      selectedFilterText: {
        color: '#fff',
      },
})