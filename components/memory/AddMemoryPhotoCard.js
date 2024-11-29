import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../common/Card'
import PressableButton from '../common/PressableButton';
import ImageManager from '../common/ImageManager';

export default function AddMemoryPhotoCard( {isVisible, cancelHandler, inputHandler, existingPhotos} ) {
  const [newImageUris, setnewImageUris] = useState([]);
  const [deletedImageUris, setDeletedImageUris] = useState([]);

  function submitHandler() {
    console.log('submit:' , newImageUris, deletedImageUris);
    inputHandler(newImageUris, deletedImageUris);
  }

  function receiveImageUri(newUris, deletedUris) {
    setnewImageUris(newUris);
    setDeletedImageUris(deletedUris);
}

  return (
    <Card isVisible={isVisible} onBack={cancelHandler}>
      <Text>Memory Photos:</Text>
      <ImageManager
        receiveImageUri={receiveImageUri}
        existingPhotos={existingPhotos}/>
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