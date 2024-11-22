import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../common/Card'
import PressableButton from '../common/PressableButton';

export default function AddMemoryPhotoCard( {isVisible, cancelHandler} ) {
  
  function submitHandler() {
    console.log('submit');
    cancelHandler();
  } 

  return (
    <Card isVisible={isVisible} onBack={cancelHandler}>
      <View style={styles.buttonContainer}>
        <PressableButton
          pressHandler={cancelHandler}>
          <Text>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressHandler={submitHandler}>
          <Text>Submit</Text>
        </PressableButton>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})