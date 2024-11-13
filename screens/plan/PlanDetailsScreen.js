import { StyleSheet, Text, View, FlatList, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { getItemNameById, getImagesById } from '../../services/dataService';
import PressableButton from '../../components/common/PressableButton';
import { writeToDB, deleteFromDB, updateDB } from '../../firebase/firestoreHelper';

export default function PlanDetailsScreen( {navigation, route} ) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  const pastMode = item.time.toDate() < new Date();
  
  useEffect(() => {
    navigation.setOptions({
      title: item.planName,
    })
  }, [navigation, item]);

  function renderImage({item}) {
    return <Image
      source={{ uri: item }}
      style={{ width: 350, height: 200 }} />
  }

  function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
    const dateString = date.toLocaleDateString('en-US', options);
    const [weekday, datePart] = dateString.split(', ');
    const [month, day, year] = datePart.split('/'); 
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${year}/${month}/${day} ${weekday} ${timeString}`;
  };

  function handleEdit() {
    navigation.navigate('Modify Plan', {item});
  }

  function pressDelete() {
    Alert.alert("Important", "Are you sure you want to delete this plan?", [
      {text: "No", style: "cancel"},
      { text: "Yes",
        onPress: () => {
          deleteFromDB(item.id, 'plan');
          navigation.goBack();
        },
      },
    ]);
  }

  function handleArchive() {
    // Archive
    const newMemoryData = {
      memoryName: item.planName,
      playgroundId: item.playgroundId,
      time: item.time,
    };
    writeToDB(newMemoryData, 'memory');

    // Update the plan to be archived
    const updatedPlanData = {
      ...item,
      archived: true,
    };
    updateDB(item.id, updatedPlanData, 'plan');

    // Navigate back to the main screen 
    navigation.navigate('Main', {screen: 'Memory'});
  }

  function pressArchive() {
    Alert.alert("Important", "Are you sure you want to archive this plan?", [
      {text: "No", style: "cancel"},
      { text: "Yes",
        onPress: () => {
          handleArchive();
          navigation.navigate('Main', {screen: 'Memory'});
        },
      },
    ]);
  }

  return (
    <View>
      <Text>{playgroundName}</Text>
      <Text>{formatDate(item.time.toDate())}</Text>
      <FlatList
        data={images} // Assuming item.images is an array of image URLs
        renderItem={renderImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {!pastMode && (
        <View style={styles.buttonContainer}>
          <PressableButton pressHandler={pressDelete}>
            <Text>Delete</Text>
          </PressableButton>
          <PressableButton pressHandler={handleEdit}>
            <Text>Edit</Text>
          </PressableButton>
        </View>
      )}
      {pastMode && (
        <View style={styles.buttonContainer}>
          <PressableButton pressHandler={pressDelete}>
            <Text>Delete</Text>
          </PressableButton>
          <PressableButton pressHandler={pressArchive} disabled={item.archived}>
            <Text>Archive</Text>
          </PressableButton>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})