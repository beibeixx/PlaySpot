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
      setPlans(newArray);
    });
    return () => {
      unsubscribePlans();
    };
  }, [timetype]);

  function renderItem ({ item }) {
    return <PressableButton
        pressHandler={() => navigation.navigate('Plan Details', {item})}>
      <Text>{item.planName}</Text>
      <ItemImage id={item.playgroundId} />
      <Text>{new Date(item.time.toDate()).toLocaleString()}</Text>
      </PressableButton>
  };

  return (
    <View>
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={item => item.time}
      />
    </View>
  )
}

const styles = StyleSheet.create({})