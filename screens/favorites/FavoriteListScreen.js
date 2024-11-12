import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FavoriteItemsList from '../../components/favorite/FavoriteItemsList'

export default function FavoriteListScreen({navigation}) {
  return (
    <View>
        <FavoriteItemsList navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({})