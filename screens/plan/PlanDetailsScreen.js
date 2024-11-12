import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { getItemNameById, getImagesById } from '../../services/dataService';

export default function PlanDetailsScreen( {navigation, route} ) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  
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
    </View>
  )
}

const styles = StyleSheet.create({})