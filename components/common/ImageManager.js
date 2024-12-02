import {
  Alert,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PressableButton from "./PressableButton";
import { imageManagerStyles } from "../../styles/components/imageManager";
import { colors } from "../../styles/helper/colors";
import CommonActivityIndicator from "./CommonActivityIndicator";

export default function ImageManager({ receiveImageUri, existingPhotos }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState([]);
  const [existUris, setExistingUris] = useState(existingPhotos || []);
  const [deletedUris, setDeletedUris] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("Error verifying permission:", err);
      return false;
    }
  }

  async function takeImageHandler() {
    try {
      const hasPermission = await verifyPermisiion();
      if (!hasPermission) {
        Alert.alert("You need to give permission for camera");
        return;
      }
      setIsLoading(true);

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
    } catch (err) {
      console.log("Error picking image:", err);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function pickImageHandler() {
    try {
      setIsLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.canceled) {
        const newImageUris = [...imageUri, result.assets[0].uri];
        setImageUri(newImageUris);
        receiveImageUri(newImageUris, deletedUris);
      }
    } catch (err) {
      console.log("Error picking image:", err);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function showImagePickerOptions() {
    Alert.alert(
      "Add Photo",
      "Choose how you want to add a photo",
      [
        { text: "Take Photo", onPress: takeImageHandler },
        { text: "Choose from Gallery", onPress: pickImageHandler },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  }

  function deleteImageHandler(uri, type) {
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          if (type === "new") {
            setImageUri((prev) => prev.filter((image) => image !== uri));
            receiveImageUri(
              imageUri.filter((image) => image !== uri),
              deletedUris
            );
          } else {
            setExistingUris((prev) => prev.filter((image) => image !== uri));
            const relativePath = decodeURIComponent(
              uri.split("/o/")[1].split("?")[0]
            );
            setDeletedUris((prev) => [...prev, relativePath]);
            receiveImageUri(imageUri, [...deletedUris, relativePath]);
          }
        },
      },
    ]);
  }

  function renderImage(uri, index, type) {
    if (type === 'add Image') {
      return (
        <PressableButton 
          pressHandler={showImagePickerOptions}
          componentStyle={styles.addImage}>
          <MaterialCommunityIcons name="image-plus" size={90} color="gray" />
        </PressableButton>
      );
    }
    return (
      <View key={index} style={imageManagerStyles.imageContainer}>
        <Image
          source={{ uri: uri }}
          style={imageManagerStyles.image}
          alt={`previed of the image ${index + 1}`}
        />
        <PressableButton
          pressHandler={() => deleteImageHandler(uri, type)}
          componentStyle={imageManagerStyles.deleteButton}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={24}
            color={colors.status.error}
          />
        </PressableButton>
      </View>
    );
  }

  if (isLoading) {
    return <CommonActivityIndicator />;
  }

  return (
    <View style={imageManagerStyles.container}>
      <ScrollView
        contentContainerStyle={imageManagerStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        <View style={imageManagerStyles.photosGrid}>
          <PressableButton
            pressHandler={showImagePickerOptions}
            componentStyle={imageManagerStyles.addButton}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name="image-plus"
              size={40}
              style={imageManagerStyles.addIcon}
            />
          </PressableButton>

          {existUris.map((uri, index) => renderImage(uri, index, "existing"))}
          {imageUri.map((uri, index) => renderImage(uri, index, "new"))}
        </View>
      </ScrollView>
    </View>
  );
}
