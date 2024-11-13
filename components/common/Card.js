// Reuseable card
import { Modal, StyleSheet, View } from 'react-native'
import React from 'react'

export default function Card( {children, isVisible, onBack} ) {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onBack}
      transparent={true}>
      <View style={styles.card}>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: '80%',
    maxWidth: 400,
    justifyContent: 'space-around',
    elevation: 5,
  },
})