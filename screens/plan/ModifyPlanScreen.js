import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native'
import React, {useState, useRef} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from 'react-native-elements';
import { fetchData } from '../../services/dataService';
import PressableButton from '../../components/common/PressableButton';

export default function ModifyPlanScreen( {navigation, item}) {
  const isModify = item ? true : false;
  const playgrounds = fetchData();

  const [planName, setPlanName] = useState(isModify ? item.name : '');
  const [selectedPlayground, setSelectedPlayground] = useState(isModify ? item.playground : '');
  const [time, setTime] = useState(isModify ? item.time : new Date());
  const [reminderTime, setReminderTime] = useState(isModify ? item.reminderTime : new Date())
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState(playgrounds);

  const searchBarRef = useRef(null);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredPlaygrounds(
      playgrounds.filter((playground) =>
        playground.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSave = () => {
    if (!planName) {
      Alert.alert('Please enter a plan name');
      return;
    }
    if (!selectedPlayground) {
      Alert.alert('Please select a playground');
      return;
    }
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
      <Text>Select Location</Text>
      <SearchBar
        placeholder="Search Playground"
        onChangeText={handleSearch}
        value={searchQuery}
        onFocus={() => setSelectedPlayground('')}
        ref={searchBarRef}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
      />
      {searchQuery && !selectedPlayground && (
      <FlatList
        data={filteredPlaygrounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setSelectedPlayground(item);
            setSearchQuery(''); // Clear search query
            searchBarRef.current.blur();; // Clear search bar
            }}>
            <Text style={styles.playgroundItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      )}
      {selectedPlayground && <Text>Selected Playground: {selectedPlayground.name}</Text>}
      <Text>Plan Name:</Text>
      <TextInput
        placeholder="Plan Name"
        value={planName}
        onChangeText={setPlanName}
        style={styles.input}
      />
      <Text>Select Time:</Text>
      <DateTimePicker
        value={time}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => setTime(selectedDate || time)}
      />
      <Text>Select Reminder Time:</Text>
      <DateTimePicker
        value={reminderTime}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => setReminderTime(selectedDate || reminderTime)}
      />
      <View style={styles.buttonContainer}>
      <PressableButton pressHandler={() => navigation.goBack()}>
        <Text>Cancel</Text>
      </PressableButton>
      <PressableButton pressHandler={handleSave}>
        <Text>Submit</Text>
      </PressableButton>
      </View>
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
  searchContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInputContainer: {
    backgroundColor: '#e0e0e0',
  },
  searchInput: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});