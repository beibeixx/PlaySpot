import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../common/Card'
import PressableButton from '../common/PressableButton';
import ImageManager from '../common/ImageManager';

export default function AddMemoryPhotoCard( {isVisible, cancelHandler, inputHandler} ) {
  const [newImageUris, setImageUris] = useState([]);

  function submitHandler() {
    console.log('submit');
    inputHandler(newImageUris);
  }

  function receiveImageUri(uri) {
    console.log('Received image uri:', uri);
    setImageUris(uri);
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