//Memory detail page to display specific data from memory collection
import {
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getImagesById, getItemNameById } from "../../services/dataService";
import {
  updateDB,
  deleteFromDB,
  removeImageFromDB,
} from "../../firebase/firestoreHelper";
import PressableButton from "../../components/common/PressableButton";
import AddMemoryPhotoCard from "../../components/memory/AddMemoryPhotoCard";
import LocationManager from "../../components/map/LocationManager";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase/firebaseSetup";
import * as ImageManipulator from "expo-image-manipulator";
import MemoCard from "../../components/memory/MemoCard";
import { memoryDetailStyles } from "../../styles/screens/memoryDetail";
import { colors } from "../../styles/helper/colors";

export default function MemoryDetailsScreen({ navigation, route }) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  const [isEditing, setIsEditing] = useState(false);
  const [newMemoryName, setNewMemoryName] = useState(item.memoryName);
  const [memo, setMemo] = useState(item.memo ? item.memo : "");
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [showAddPhotoCard, setShowAddPhotoCard] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    async function getImageUris() {
      try {
        if (item.photos && item.photos.length > 0) {
          const imageUris = await Promise.all(
            item.photos.map(async (photo) => {
              const imageRef = ref(storage, photo);
              const httpsImageUri = await getDownloadURL(imageRef);
              return httpsImageUri;
            })
          );
          setUserPhotos(imageUris);
        }
      } catch (error) {
        console.error("Error getting image uri:", error);
      }
    }
    getImageUris();
  }, [item.photos]);

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
    };
    const dateString = date.toLocaleDateString("en-US", options);
    const [weekday, datePart] = dateString.split(", ");
    const [month, day, year] = datePart.split("/");
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${year}/${month}/${day} ${weekday} ${timeString}`;
  }

  function handleUpdateName() {
    const updatedMemoryData = {
      ...item,
      memoryName: newMemoryName,
    };
    updateDB(item.id, updatedMemoryData, "memory");
    setIsEditing(false);
  }

  function handleMemoSubmit(newMemo) {
    const updatedMemoryData = {
      ...item,
      memo: newMemo.trim(),
    };
    updateDB(item.id, updatedMemoryData, "memory");
    setMemo(newMemo.trim());
    setIsMemoVisible(false);
  }

  async function resizeImage(uri) {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult.uri;
  }

  async function handleUpdatePhotos(newImageUris, deletedImageUris) {
    let newPhotos = [];
    if (newImageUris.length > 0) {
      const resizedPhotos = await Promise.all(
        newImageUris.map((uri) => resizeImage(uri))
      );
      newPhotos = await fetchAndUploadImage(resizedPhotos);
      console.log("new photos", newPhotos);
    }

    // Remove deleted photos from storage
    if (deletedImageUris.length > 0) {
      await Promise.all(
        deletedImageUris.map(async (uri) => {
          const imageRef = ref(storage, uri);
          await deleteObject(imageRef);
          console.log("deleted image", uri);
          await removeImageFromDB(uri, "memory", item.id);
        })
      );
    }
    const updatedMemoryData = {
      ...item,
      photos: [...(item.photos || []), ...newPhotos].filter(
        (photo) => !deletedImageUris.includes(photo)
      ),
    };
    console.log("updated memory data", updatedMemoryData);
    updateDB(item.id, updatedMemoryData, "memory");
    console.log("update photos success");

    // Update userPhotos state to trigger re-render
    const imageUris = await Promise.all(
      updatedMemoryData.photos.map(async (photo) => {
        const imageRef = ref(storage, photo);
        const httpsImageUri = await getDownloadURL(imageRef);
        return httpsImageUri;
      })
    );
    setUserPhotos(imageUris);
    setShowAddPhotoCard(false);
  }

  function renderImage({ item }) {
    return <Image source={{ uri: item }} style={memoryDetailStyles.image} />;
  }

  function handleDelete() {
    Alert.alert("Important", "Are you sure you want to delete this memory?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          deleteFromDB(item.id, "memory");
          navigation.goBack();
        },
      },
    ]);
  }

  async function fetchAndUploadImage(imageUris) {
    const uploadResults = [];
    for (const uri of imageUris) {
      try {
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const imageName = uri.substring(uri.lastIndexOf("/") + 1);
        const storageRef = ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(storageRef, blob);
        console.log("Upload is successful", uploadResult);
        uploadResults.push(uploadResult.metadata.fullPath);
      } catch (err) {
        console.error("fetch image", err);
      }
    }
    return uploadResults;
  }

  return (
    <View style={memoryDetailStyles.container}>
      <ScrollView>
        {/* Memory Name Section */}
        <View style={memoryDetailStyles.nameSection}>
          {isEditing ? (
            <TextInput
              value={newMemoryName}
              onChangeText={setNewMemoryName}
              onBlur={handleUpdateName}
              style={memoryDetailStyles.nameInput}
              autoFocus
            />
          ) : (
            <Text>{newMemoryName}</Text>
          )}
          <PressableButton pressHandler={() => setIsEditing(!isEditing)}>
            <Feather
              name={isEditing ? "check" : "edit-2"}
              size={24}
              color={colors.primary[500]}
            />
          </PressableButton>
        </View>

        {/* Location Section */}
        <View style={memoryDetailStyles.section}>
          <View style={memoryDetailStyles.sectionHeader}>
            <Text style={memoryDetailStyles.sectionTitle}>Location</Text>
          </View>
          <View style={memoryDetailStyles.sectionContent}>
            <Text style={memoryDetailStyles.infoText}>{playgroundName}</Text>
            <LocationManager selectedPlace={item.playgroundId} />
          </View>
        </View>

        {/* Time Section */}
        <View style={memoryDetailStyles.section}>
          <View style={memoryDetailStyles.sectionHeader}>
            <Text style={memoryDetailStyles.sectionTitle}>Date & Time</Text>
          </View>
          <View style={memoryDetailStyles.sectionContent}>
            <Text style={memoryDetailStyles.infoText}>
              {formatDate(item.time.toDate())}
            </Text>
          </View>
        </View>

        {/* Photos Section */}
        <View style={memoryDetailStyles.section}>
          <View style={memoryDetailStyles.sectionHeader}>
            <Text style={memoryDetailStyles.sectionTitle}>Photos</Text>
          </View>
          <FlatList
            data={userPhotos.length > 0 ? userPhotos : images}
            renderItem={renderImage}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={memoryDetailStyles.imageList}
          />
        </View>

        {/* Memo Section */}
        {memo ? (
          <View style={memoryDetailStyles.memoContainer}>
            <Text style={memoryDetailStyles.memoText}>{memo}</Text>
          </View>
        ) : null}

        <View style={memoryDetailStyles.actionContainer}>
          <PressableButton
            pressHandler={() => setShowAddPhotoCard(true)}
            componentStyle={memoryDetailStyles.secondaryButton}
          >
            <Feather name="image" size={20} color={colors.primary[700]} />
            <Text
              style={[
                memoryDetailStyles.buttonText,
                memoryDetailStyles.secondaryButtonText,
              ]}
            >
              Edit Photos
            </Text>
          </PressableButton>

          <PressableButton
            pressHandler={() => setIsMemoVisible(true)}
            componentStyle={memoryDetailStyles.secondaryButton}
          >
            <Feather name="edit-3" size={20} color={colors.primary[700]} />
            <Text
              style={[
                memoryDetailStyles.buttonText,
                memoryDetailStyles.secondaryButtonText,
              ]}
            >
              {memo ? "Edit Memo" : "Add Memo"}
            </Text>
          </PressableButton>

          <PressableButton
            pressHandler={() =>
              navigation.navigate("Modify Plan", {
                item: {
                  planName: newMemoryName,
                  playgroundId: item.playgroundId,
                },
              })
            }
            componentStyle={memoryDetailStyles.primaryButton}
          >
            <Feather name="calendar" size={20} color={colors.text.white} />
            <Text style={memoryDetailStyles.buttonText}>Plan Again</Text>
          </PressableButton>

          <PressableButton
            pressHandler={handleDelete}
            componentStyle={[
              memoryDetailStyles.primaryButton,
              memoryDetailStyles.deleteButton,
            ]}
          >
            <Feather name="trash-2" size={20} color={colors.text.white} />
            <Text style={memoryDetailStyles.buttonText}>Delete Memory</Text>
          </PressableButton>
        </View>
      </ScrollView>
      <MemoCard
        isVisible={isMemoVisible}
        onCancel={() => setIsMemoVisible(false)}
        onSubmit={handleMemoSubmit}
        initialMemo={memo}
      />

      <AddMemoryPhotoCard
        isVisible={showAddPhotoCard}
        cancelHandler={() => setShowAddPhotoCard(false)}
        inputHandler={handleUpdatePhotos}
        existingPhotos={userPhotos}
      />
    </View>
  );
}

