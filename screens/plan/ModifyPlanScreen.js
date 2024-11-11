import { StyleSheet, Text, View, TextInput, FlatList, Button, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchData } from '../../services/dataService';

export default function ModifyPlanScreen( {navigation, item}) {
  const isModify = item ? true : false;
  const playgrounds = fetchData();

  const [planName, setPlanName] = useState(isModify ? item.name : '');
  const [selectedPlayground, setSelectedPlayground] = useState(isModify ? item.playground : '');
  const [time, setTime] = useState(isModify ? item.time : new Date());
  const [reminderTime, setReminderTime] = useState(isModify ? item.reminderTime : new Date())
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState(playgrounds);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredPlaygrounds(
      playgrounds.filter((playground) =>
        playground.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSave = () => {
    const planData = {
      planName,
      playground: selectedPlayground,
      time,
      reminderTime,
    };
    // Save planData to Firestore or any other storage
    console.log(planData);
  };

  return (
    <View style={styles.container}>
      <Text>Modify Plan</Text>
      <TextInput
        placeholder="Search Playground"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />
      <FlatList
        data={filteredPlaygrounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedPlayground(item)}>
            <Text style={styles.playgroundItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedPlayground && <Text>Selected Playground: {selectedPlayground.name}</Text>}
      <TextInput
        placeholder="Plan Name"
        value={planName}
        onChangeText={setPlanName}
        style={styles.input}
      />
      <Text>Select Time:</Text>
      <DateTimePicker
        value={time}
        mode="time"
        display="default"
        onChange={(event, selectedDate) => setTime(selectedDate || time)}
      />
      <Text>Select Reminder Time:</Text>
      <DateTimePicker
        value={reminderTime}
        mode="time"
        display="default"
        onChange={(event, selectedDate) => setReminderTime(selectedDate || reminderTime)}
      />
      <Button title="Save Plan" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  playgroundItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});