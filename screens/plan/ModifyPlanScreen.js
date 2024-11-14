import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import React, { useState, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from '@rneui/themed';
import { fetchData, getItemById } from '../../services/dataService';
import { writeToDB, updateDB } from '../../firebase/firestoreHelper';
import Screen from '../../components/common/Screen';
import PressableButton from '../../components/common/PressableButton';
import commonStyles from '../../utils/style';
import { auth } from '../../firebase/firebaseSetup';

export default function ModifyPlanScreen({ navigation, route }) {
  const { item } = route.params;
  const isModify = item ? true : false;
  const playgrounds = fetchData();

  const [planName, setPlanName] = useState(isModify ? item.planName : '');
  const [selectedPlayground, setSelectedPlayground] = useState(checkPlayground(item));
  const [time, setTime] = useState(isModify && item.time ? item.time.toDate() : new Date());
  const [reminderTime, setReminderTime] = useState(isModify && item.reminderTime ? item.reminderTime.toDate() : new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState(playgrounds);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
  const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);

  const searchBarRef = useRef(null);

  function checkPlayground(item) {
    if (isModify) {
      const playground = getItemById(item.playgroundId);
      return playground;
    } else {
      return '';
    }
  }

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
      reminderTime: reminderTime,
      archived: false,
      owner: auth.currentUser.uid,
    };

    // Save planData to Firestore or any other storage
    if (!isModify) {
      // Adding the new entry to the data
      writeToDB(newPlanData, 'plan');
    } else {
      // Updating the existing entry in the data
      updateDB(item.id, newPlanData, 'plan');
    }
    navigation.navigate('Main', { screen: 'Plan' });
  };

  return (
    <Screen>
    <View style={styles.container}>
      <Text style={commonStyles.header}>Location: </Text>
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
            <TouchableOpacity
              onPress={() => {
                setSelectedPlayground(item);
                setSearchQuery('');
                searchBarRef.current.blur();
              }}>
              <Text style={styles.playgroundItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {selectedPlayground && <Text style={commonStyles.planName}>Selected: {selectedPlayground.name}</Text>}
      <Text style={commonStyles.header}>Plan Name:</Text>
      <TextInput
        placeholder="Plan Name"
        value={planName}
        onChangeText={setPlanName}
        style={styles.input}
      />

      {/* Date and Time Pickers for Plan Time */}
      <Text style={commonStyles.header}>Time:</Text>
      <View style={commonStyles.buttonContainer}>
        <PressableButton 
          pressHandler={() => setShowDatePicker(true)}
          componentStyle={commonStyles.timeButton}>
          <Text>{time.toLocaleDateString()}</Text>
        </PressableButton>
        <PressableButton
          pressHandler={() => setShowTimePicker(true)}
          componentStyle={commonStyles.timeButton}>
          <Text>{time.toLocaleTimeString()}</Text>
        </PressableButton>
      </View>
      <View style={commonStyles.buttonContainer}>
      {showDatePicker && (
        <DateTimePicker
          value={time}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setTime(selectedDate);
          }}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(new Date(time.setHours(selectedTime.getHours(), selectedTime.getMinutes())));
          }}
        />
      )}
      </View>
      {/* Date and Time Pickers for Reminder Time */}
      <Text style={commonStyles.header}>Reminder Time:</Text>
      <View style={commonStyles.buttonContainer}>
        <PressableButton
          pressHandler={() => setShowReminderDatePicker(true)}
          componentStyle={commonStyles.timeButton}>
          <Text>{reminderTime.toLocaleDateString()}</Text>
        </PressableButton>
        <PressableButton
          pressHandler={() => setShowReminderTimePicker(true)}
          componentStyle={commonStyles.timeButton}>
          <Text>{reminderTime.toLocaleTimeString()}</Text>
        </PressableButton>
      </View>
      <View style={commonStyles.buttonContainer}>
      {showReminderDatePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowReminderDatePicker(false);
            if (selectedDate) setReminderTime(selectedDate);
          }}
        />
      )}
      {showReminderTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowReminderTimePicker(false);
            if (selectedTime) setReminderTime(new Date(reminderTime.setHours(selectedTime.getHours(), selectedTime.getMinutes())));
          }}
        />
      )}
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          pressHandler={() => navigation.goBack()}
          componentStyle={commonStyles.editButton}>
          <Text>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressHandler={handleSave}
          componentStyle={commonStyles.editButton}>
          <Text>Submit</Text>
        </PressableButton>
      </View>
    </View>
    </Screen>
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