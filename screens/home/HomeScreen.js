import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import dataService, { fetchData } from '../../services/dataService'

export default function HomeScreen({ navigation}) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const items = fetchData();
      setData(items);
      setFilteredData(items);
    } catch(err) {
      console.log("Fetch data error",err)
    }
  }

  const renderItem = ({item}) => {
    return(
    <TouchableOpacity>
      <View>
        <Image source={{ uri: item.images[0]}} style={{width: 100, height: 100}}/>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> 
    </View>
  )
}

const styles = StyleSheet.create({})