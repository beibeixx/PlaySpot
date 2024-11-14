import { FlatList, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, onSnapshot, query, where} from 'firebase/firestore'
import { database } from '../../firebase/firebaseSetup'
import PressableButton from '../common/PressableButton'
import ItemImage from './ItemImage'
import formatDate from '../../utils/helpers'
import commonStyles from '../../utils/style'
import { auth } from '../../firebase/firebaseSetup'

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
        componentStyle={commonStyles.itemCard}>
      <ItemImage id={item.playgroundId} />
      <Text style={commonStyles.planName}>{item.planName}</Text>
      <Text style={commonStyles.timeText}>{formatDate(item.time.toDate())}</Text>
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
};