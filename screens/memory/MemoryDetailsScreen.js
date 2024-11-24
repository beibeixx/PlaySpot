//Memory detail page to display specific data from memory collection
import { StyleSheet, Text, View, FlatList, TextInput, Image, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getImagesById, getItemNameById } from '../../services/dataService';
import { updateDB, deleteFromDB } from '../../firebase/firestoreHelper';
import Screen from '../../components/common/Screen';
import PressableButton from '../../components/common/PressableButton';
import Card from '../../components/common/Card';
import AddMemoryPhotoCard from '../../components/memory/AddMemoryPhotoCard';
import LocationManager from '../../components/map/LocationManager';
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '../../utils/style';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebaseSetup';


export default function MemoryDetailsScreen( {navigation, route} ) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  const [isEditing, setIsEditing] = useState(false);
  const [newMemoryName, setNewMemoryName] = useState(item.memoryName);
  const [newMemo, setNewMemo] = useState(item.memo ? item.memo : '');
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [showAddPhotoCard, setShowAddPhotoCard] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    async function getImageUris() {
      try {
        const imageUris = await Promise.all(item.photos.map(async (photo) => {
        const imageRef = ref(storage, photo);
        const httpsImageUri = await getDownloadURL(imageRef);
        return httpsImageUri;
      }));
        setUserPhotos(imageUris);
      } catch (error) {
        console.error('Error getting image uri:', error);
      }
    }
    getImageUris();
  }, [item.photos]);

  function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
    const dateString = date.toLocaleDateString('en-US', options);
    const [weekday, datePart] = dateString.split(', ');
    const [month, day, year] = datePart.split('/'); 
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${year}/${month}/${day} ${weekday} ${timeString}`;
  };

  function handleUpdateName() {
    const updatedMemoryData = {
      ...item,
      memoryName: newMemoryName,
    };
    updateDB(item.id, updatedMemoryData, 'memory');
    setIsEditing(false);
  };

  function handleUpdateMeno() {
    const updatedMemoryData = {
      ...item,
      memo: newMemo,
    };
    updateDB(item.id, updatedMemoryData, 'memory');
    setIsMemoVisible(false);
  }
  
  async function handleUpdatePhotos(userPhotos) {
    let newPhotos = [];
    if (userPhotos.length > 0) {
      newPhotos = await fetchAndUploadImage(userPhotos);
    }
    if (newPhotos.length > 0) {
      const updatedMemoryData = {
        ...item,
        photos: [...item.photos, ...newPhotos],
      };
      updateDB(item.id, updatedMemoryData, 'memory');
    }
    setShowAddPhotoCard(false);
  }

  function renderImage({item}) {
    return <Image
      source={{ uri: item }}
      style={{ width: 350, height: 200 }} />
  }

  function handleAddMemo() {
    setIsMemoVisible(true);
  }

  function memoModalHandler() {
    setIsMemoVisible(false);
  }

  function handleEditPhotos() {
    setShowAddPhotoCard(true);
  }

  function photoCardHandler() {
    setShowAddPhotoCard(false);
  }

  function createNewPlan() {
    const newPlanData = {
      planName: item.memoryName,
      playgroundId: item.playgroundId,
    };
    console.log(newPlanData);
    navigation.navigate('Modify Plan', {item: newPlanData});
  }

  function pressDelete() {
    Alert.alert("Important", "Are you sure you want to delete this memory?", [
      {text: "No", style: "cancel"},
      { text: "Yes",
        onPress: () => {
          deleteFromDB(item.id, 'memory');
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
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const imageName = uri.substring(uri.lastIndexOf('/') + 1);
        const storageRef = ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(storageRef, blob);
        console.log('Upload is successful', uploadResult);
        uploadResults.push(uploadResult.metadata.fullPath);
      } catch (err) {
        console.error('fetch image',err);
      }
    }
    return uploadResults;
  }

  return (
    <Screen>
    <ScrollView>
      <Text style={commonStyles.header}>Memory</Text>
      <View style={styles.headerContainer}>
        {isEditing ? (
          <TextInput
            value={newMemoryName}
            onChangeText={setNewMemoryName}
            onBlur={handleUpdateName}
          />
        ) : (
          <Text>{newMemoryName}</Text>
        )}
        <PressableButton
          pressHandler={() => setIsEditing(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </PressableButton>
      </View>

      <Text style={commonStyles.header}>Location</Text>
      <Text>{playgroundName}</Text>
      <Text style={commonStyles.header}>Time</Text>
      <Text>{formatDate(item.time.toDate())}</Text>

      <View style={styles.galleryContainer}>
      <FlatList
        data={userPhotos.length > 0 ? userPhotos : images} // Assuming item.images is an array of image URLs
        renderItem={renderImage}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton 
          pressHandler={handleAddMemo}
          componentStyle={commonStyles.editButton}>
          <Text>Add Memo</Text>
        </PressableButton>
        <PressableButton
          pressHandler={handleEditPhotos}
          componentStyle={commonStyles.editButton}>
          <Text>Edit Photos</Text>
        </PressableButton>
      </View>
      <View style={styles.buttonContainer}>
      <PressableButton
        pressHandler={createNewPlan}
        componentStyle={commonStyles.editButton}>
        <Text>Create New Plan Again</Text>
      </PressableButton>
      </View>
      {isMemoVisible && (
        <Card isVisible={isMemoVisible} onBack={memoModalHandler}>
        <TextInput
          value={newMemo}
          onChangeText={setNewMemo}
          placeholder={newMemo ? newMemo : 'Add your memo here'}
        />
        <View style={styles.buttonContainer}>
          <PressableButton
            pressHandler={memoModalHandler}>
            <Text>Cancel</Text>
          </PressableButton>
        <PressableButton
          pressHandler={handleUpdateMeno}>
          <Text>Save Memo</Text>
        </PressableButton>
        </View>
      </Card>
      )}
      {showAddPhotoCard && (
        <AddMemoryPhotoCard
          isVisible={showAddPhotoCard}
          cancelHandler={photoCardHandler}
          inputHandler={handleUpdatePhotos}
        />
      )}
      {newMemo && (
        <View>
        <Text style={commonStyles.header}>Memo</Text>
        <Text>{newMemo}</Text>
        </View>)}
      <LocationManager selectedPlace={item.playgroundId} />
      <View style={styles.buttonContainer}>
      <PressableButton
        pressHandler={pressDelete}
        componentStyle={commonStyles.alertButton}>
        <Text>Delete This Memory</Text>
      </PressableButton>
      </View>
    </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  galleryContainer: {
    marginVertical: 20,
  }
})