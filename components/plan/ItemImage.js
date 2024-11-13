import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { getItemImageById } from '../../services/dataService'

export default function ItemImage( {id}) {
  const imageUri = getItemImageById(id);
  return (
    <Image
    source={{ uri: imageUri}}
    style={{ width: 300, height: 100 }}
    />
  )
}

const styles = StyleSheet.create({})