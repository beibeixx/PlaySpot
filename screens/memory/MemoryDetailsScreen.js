import { StyleSheet, Text, View, FlatList, TextInput, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { getImagesById, getItemNameById } from '../../services/dataService';
import { updateDB, deleteFromDB } from '../../firebase/firestoreHelper';
import PressableButton from '../../components/common/PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function MemoryDetailsScreen( {navigation, route} ) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  const [isEditing, setIsEditing] = useState(false);
  const [newMemoryName, setNewMemoryName] = useState(item.memoryName);

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

  function renderImage({item}) {
    return <Image
      source={{ uri: item }}
      style={{ width: 350, height: 200 }} />
  }

  function handleAddMemo() {
    console.log('Add Memo');
  }

  function handleEditPhotos() {
    console.log('Edit Photos');
  }

  function createNewPlan() {
    console.log('Create New Plan Again');
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

  return (
    <View>
      <Text>{playgroundName}</Text>
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
      <Text>{formatDate(item.time.toDate())}</Text>
      <FlatList
        data={images} // Assuming item.images is an array of image URLs
        renderItem={renderImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.buttonContainer}>
        <PressableButton pressHandler={handleAddMemo}>
          <Text>Add Memo</Text>
        </PressableButton>
        <PressableButton pressHandler={handleEditPhotos}>
          <Text>Edit Photos</Text>
        </PressableButton>
      </View>
      <PressableButton
        pressHandler={createNewPlan}>
        <Text>Create New Plan Again</Text>
      </PressableButton>
      <PressableButton
        pressHandler={pressDelete}>
        <Text>Delete This Memory</Text>
      </PressableButton>
    </View>
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
})