import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../common/Card'
import PressableButton from '../common/PressableButton';
import ImageManager from '../common/ImageManager';

export default function AddMemoryPhotoCard( {isVisible, cancelHandler} ) {

  function submitHandler() {
    console.log('submit');
    cancelHandler();
  }

  function receiveImageUri(uri) {
    console.log('Received image uri:', uri);
    setImageUri(uri);
}

  return (
    <Card isVisible={isVisible} onBack={cancelHandler}>
      <Text>Memory Photos:</Text>
      <ImageManager receiveImageUri={receiveImageUri} />
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