import { Alert, Button, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PressableButton from './PressableButton';

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
      if (!hasPermission) {
        Alert.alert('You need to give permission for camera');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        receiveImageUri(result.assets[0].uri);
      }
    }
    catch (err) {
      console.log('Error picking image:', err);
    }
  };

  async function pickImageHandler() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        receiveImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Error picking image:', err);
    }
  }

  function showImagePickerOptions() {
    Alert.alert(
      'Select Image',
      'Would you like to take a photo or choose from gallery?',
      [
        { text: 'Take Photo', onPress: takeImageHandler },
        { text: 'Choose from Gallery', onPress: pickImageHandler },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  }

  return (
    <View>
      { imageUri && (
      <Image 
        source={{ uri: imageUri }}
        style={styles.Image}
        alt="preview of the image taken"
      />
      )}
      <PressableButton pressHandler={showImagePickerOptions}>
        <MaterialCommunityIcons name="image-plus" size={100} color="black" />
      </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  Image: {
    width: 150,
    height: 150,
  },
})