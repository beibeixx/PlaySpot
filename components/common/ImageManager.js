import { Alert, Button, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager( {receiveImageUri} ) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(""); 

  async function verifyPermisiion() {
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log('Error verifying permission:', err);
    }
  }

  async function takeImageHandler () {
    try {
      const hasPermission = await verifyPermisiion();
      console.log(hasPermission);
      if (!hasPermission) {
        Alert.alert('You need to give permission for camera');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result);
      if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      receiveImageUri(result.assets[0].uri);
      }
    }
    catch (err) {
      console.log('Error picking image:', err);
    }
  };

  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler} />
      { imageUri && (
      <Image 
        source={{ uri: imageUri }}
        style={styles.Image}
        alt="preview of the image taken"
      />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  Image: {
    width: 350,
    height: 100,
  },
})