import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native'
import React, {useState, useRef} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from '@rneui/themed';
import { fetchData, getItemById } from '../../services/dataService';
import PressableButton from '../../components/common/PressableButton';
import { writeToDB, updateDB } from '../../firebase/firestoreHelper';

export default function ModifyPlanScreen( {navigation, route} ) {
  const { item } = route.params;
  const isModify = item ? true : false;
  const playgrounds = fetchData();

  const [planName, setPlanName] = useState(isModify ? item.planName : '');
  const [selectedPlayground, setSelectedPlayground] = useState(checkPlayground(item));
  const [time, setTime] = useState( isModify && item.time? item.time.toDate() : new Date());
  const [reminderTime, setReminderTime] = useState(isModify && item.reminderTime ? item.reminderTime.toDate() : new Date())
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState(playgrounds);

  const searchBarRef = useRef(null);

  function checkPlayground(item) {
    if (isModify) {
      const playground = getItemById(item.playgroundId);
      return playground;
    } else {
      return '';
    }
  };
  
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
    const newPlanData = {
      planName: planName,
      playgroundId: selectedPlayground.id,
      time: time,
      reminderTime:reminderTime,
      archived: false,
    };

    // Save planData to Firestore or any other storage
    if (!isModify) {
      // Adding the new entry to the data
      writeToDB(newPlanData, 'plan');
    } else {
      // Updating the existing entry in the data
      updateDB(item.id, newPlanData, 'plan');
    }
    // Navigating back to the previous screen
    navigation.navigate('Main', {screen: 'Plan'});
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