import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../../firebase/firebaseSetup'
import PressableButton from '../../components/common/PressableButton'
import ItemImage from '../../components/plan/ItemImage'
import Screen from '../../components/common/Screen'
import commonStyles from '../../utils/style'

export default function MemoryScreen( {navigation}) {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'memory'), (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        newArray.push({...docSnapshot.data(), id: docSnapshot.id, time: docSnapshot.data().time});
      });
      setMemories(newArray);
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  function renderItem ({ item }) {
    return <PressableButton
        pressHandler={() => navigation.navigate('Memory Details', {item})}
        componentStyle={commonStyles.itemCard}>
      <ItemImage id={item.playgroundId} />
      <Text style={commonStyles.planName}>{item.memoryName}</Text>
      <Text style={commonStyles.timeText}>{new Date(item.time.toDate()).toLocaleString()}</Text>
      </PressableButton>
  };

  return (
    <Screen>
      <FlatList
        data={memories}
        renderItem={renderItem}
        keyExtractor={item => item.time}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})