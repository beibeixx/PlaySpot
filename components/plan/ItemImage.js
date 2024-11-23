import { StyleSheet, Image, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getItemImageById } from "../../services/dataService";
import { itemImageStyles } from "../../styles/components/itemImage";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseSetup";

export default function ItemImage({ item }) {
  const [imageUri, setImageUri] = useState(
    getItemImageById(item.playgroundId) || ""
  );

  useEffect(() => {
    async function fetchLastImage() {
      if (item && item.photos && item.photos.length > 0) {
        const lastImage = item.photos[item.photos.length - 1];
        const imageRef = ref(storage, lastImage);
        try {
          const httpsImageUri = await getDownloadURL(imageRef);
          setImageUri(httpsImageUri);
        } catch (error) {
          console.error("Error getting image uri:", error);
        }
      }
    }
    fetchLastImage();
  }, [item]);

  return (
    <View style={itemImageStyles.imageContainer}>
      <Image source={{ uri: imageUri }} style={itemImageStyles.image} />
    </View>
  );
}

const styles = StyleSheet.create({});
