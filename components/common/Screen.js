import { SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'

export default function Screen( {children}) {
  return (
    <SafeAreaView style={styles.screen}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f4c7',
  }
})