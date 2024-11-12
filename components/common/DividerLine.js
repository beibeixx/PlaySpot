import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DividerLine({color, contentStyle}) {
  return (
    <View style={{backgroundColor: 'white', ...contentStyle}}>
      <View style={styles.DividerLine}/>
    </View>
  )
}

const styles = StyleSheet.create({
  DividerLine: {
    height: 0,
    borderTopWidth: 2,
    borderColor: 'gray',
    opacity: 0.8,
    marginVertical: 0.5,
  }
})