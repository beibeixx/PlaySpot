// For search bar on main page

import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function SearchBar({onSearch}) {
  return (
    <View>
        <TextInput 
            placeholder='Search for playground'
            onChangeText={onSearch}
            clearButtonMode='while-editing'
        />

    </View>
  )
}

const styles = StyleSheet.create({})