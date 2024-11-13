import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, onSnapshot, query, where} from 'firebase/firestore'
import { database } from '../../firebase/firebaseSetup'
import PressableButton from '../common/PressableButton'
import ItemImage from './ItemImage'

export default function PlanList( {timetype, navigation}) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const now = new Date();
    const planQuery = query(
      collection(database, 'plan'),
      where('time', timetype === 'upcoming' ? '>=' : '<', now)
    );
    const unsubscribePlans = onSnapshot(planQuery, (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        newArray.push({...docSnapshot.data(), id: docSnapshot.id, time: docSnapshot.data().time});
      });
      if (timetype === 'past') {
        newArray.sort((a, b) => b.time.seconds - a.time.seconds); // Sort in reverse chronological order
      } else {
        newArray.sort((a, b) => a.time.seconds - b.time.seconds); // Sort in chronological order
      }
      setPlans(newArray);
    });
    return () => {
      unsubscribePlans();
    };
  }, [timetype]);

  function renderItem ({ item }) {
    return <PressableButton
        pressHandler={() => navigation.navigate('Plan Details', {item})}
        componentStyle={styles.itemContainer}>
      <ItemImage id={item.playgroundId} />
      <Text>{item.planName}</Text>
      <Text>{new Date(item.time.toDate()).toLocaleString()}</Text>
      </PressableButton>
  };

  return (
    <View>
      <FlatList
        data={plans}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#bee893',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
})