import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PressableButton from '../../components/common/PressableButton'

export default function MemoryScreen( {navigation}) {

  useEffect(() => {
    // Set header options with a Pressable button
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressHandler={() => navigation.navigate('Modify Memory', {item: null})}
          >
            <MaterialIcons name="add-box" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, [navigation]);
  return (
    <View>
      <Text>MemoryScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})