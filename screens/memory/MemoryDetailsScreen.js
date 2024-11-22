import { StyleSheet, Text, View, FlatList, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { getImagesById, getItemNameById } from '../../services/dataService';
import { updateDB, deleteFromDB } from '../../firebase/firestoreHelper';
import Screen from '../../components/common/Screen';
import PressableButton from '../../components/common/PressableButton';
import Card from '../../components/common/Card';
import AddMemoryPhotoCard from '../../components/memory/AddMemoryPhotoCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import commonStyles from '../../utils/style';


export default function MemoryDetailsScreen( {navigation, route} ) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  const [isEditing, setIsEditing] = useState(false);
  const [newMemoryName, setNewMemoryName] = useState(item.memoryName);
  const [newMemo, setNewMemo] = useState(item.memo ? item.memo : '');
  const [isMemoVisible, setIsMemoVisible] = useState(false);
  const [showAddPhotoCard, setShowAddPhotoCard] = useState(false);
  const [userPhotos, setUserPhotos] = useState(item.photos ? item.photos : []);

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

  async function fetchAndUploadImage(uri) {
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
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.error('fetch image',err);
    }
  }

  return (
    <Screen>
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
        data={images} // Assuming item.images is an array of image URLs
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
        />
      )}
      {newMemo && (
        <View>
        <Text style={commonStyles.header}>Memo</Text>
        <Text>{newMemo}</Text>
        </View>)}
      <View style={styles.buttonContainer}>
      <PressableButton
        pressHandler={pressDelete}
        componentStyle={commonStyles.alertButton}>
        <Text>Delete This Memory</Text>
      </PressableButton>
      </View>
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