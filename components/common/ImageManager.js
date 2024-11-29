import { Alert, Button, StyleSheet, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PressableButton from './PressableButton';

export default function ImageManager( {receiveImageUri, existingPhotos} ) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState([]);
  const [existUris, setExistingUris] = useState(existingPhotos || []);
  const [deletedUris, setDeletedUris] = useState([]);

  useEffect(() => {
    setExistingUris(existingPhotos);
  }, [existingPhotos]);

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
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.canceled) {
        const newImageUris = [...imageUri, result.assets[0].uri];
        setImageUri(newImageUris);
        receiveImageUri(newImageUris, deletedUris);
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
        const newImageUris = [...imageUri, result.assets[0].uri];
        setImageUri(newImageUris);
        receiveImageUri(newImageUris, deletedUris);
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

  async function deleteImageHandler(uri, type) {
    if (type === 'new') {
      setImageUri((prev) => prev.filter((image) => image !== uri));
      receiveImageUri(imageUri.filter((image) => image !== uri), deletedUris);
    } else {
    setExistingUris((prev) => prev.filter((image) => image !== uri));
    const relativePath = decodeURIComponent(uri.split('/o/')[1].split('?')[0]);
    setDeletedUris((prev) => [...prev, relativePath]);
    receiveImageUri(imageUri, [...deletedUris, relativePath]);
    }
  }

  function renderImage(uri, index, type) {
    return (
      <View key={index}>
        <Image
          source={{ uri: uri }}
          style={styles.Image}
          alt={`previed of the image ${index + 1}`}/>
        <PressableButton pressHandler={() => deleteImageHandler(uri, type)}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </PressableButton>
      </View>
    );
  }

  return (
    <View>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {existUris.map((uri, index) => renderImage(uri, index, 'existing'))}
        {imageUri.map((uri, index) => renderImage(uri, index, 'new'))}
      <PressableButton pressHandler={showImagePickerOptions}>
        <MaterialCommunityIcons name="image-plus" size={100} color="black" />
      </PressableButton>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  Image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  scrollView: {
    margin: 10,
  },
})