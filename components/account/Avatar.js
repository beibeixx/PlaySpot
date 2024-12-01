import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/helper/colors';
import PressableButton from '../common/PressableButton';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/firebaseSetup';
import * as ImageManipulator from 'expo-image-manipulator';
import { updateAvatarInDB } from '../../firebase/firestoreHelper';

export default function Avatar({ uid, avatarUrl, pickImage }) {
  async function showImagePickerOptions() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri } = result.assets[0];
        const resizedUri = await resizeImage(uri);
        await uploadImage(resizedUri);
      }
    } catch (err) {
      console.log('Error picking image:', err);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  }

  async function resizeImage(uri) {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (err) {
      console.error('Error resizing image:', err);
      Alert.alert('Error', 'Failed to resize image. Please try again.');
    }
  }

  async function uploadImage(uri) {
    try {
      if (avatarUrl) {
        const oldAvatarRef = ref(storage, avatarUrl);
        await deleteObject(oldAvatarRef);
        console.log('Old avatar deleted:', avatarUrl);
      }
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `avatars/${imageName}`);
      const uploadResult = await uploadBytesResumable(storageRef, blob);
      const uploadURL = uploadResult.metadata.fullPath;
      await updateAvatarInDB("users", uid, uploadURL);
      const httpsImageURi = await getDownloadURL(storageRef);
      pickImage(httpsImageURi);
    } catch (err) {
      console.error('Error uploading image:', err);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  }

  return (
    <PressableButton
      componentStyle={accountStyles.avatarContainer}
      pressHandler={showImagePickerOptions}
    >
      <View style={accountStyles.avatarContainer}>
        {!avatarUrl ? (
          <MaterialCommunityIcons
            name="account-circle"
            size={60}
            color={colors.background.primary}
          />
        ) : (
          <Image
            source={{ uri: avatarUrl }}
            style={accountStyles.avatar}
          />
        )}
      </View>
    </PressableButton>
  );
}

const accountStyles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background.secondary,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});