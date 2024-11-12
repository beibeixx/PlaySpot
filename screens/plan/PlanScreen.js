import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import PressableButton from '../../components/common/PressableButton'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DividerLine from '../../components/common/DividerLine';

export default function PlanScreen( {navigation}) {
  useEffect(() => {
    // Set header options with a Pressable button
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressHandler={() => navigation.navigate('Modify Plan')}
          >
            <MaterialIcons name="add-box" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, [navigation]);

  return (
    <View>
      <Text>Upcoming</Text>
      <DividerLine />
      <Text>Past</Text>
      <DividerLine />
    </View>
  )
}

const styles = StyleSheet.create({})