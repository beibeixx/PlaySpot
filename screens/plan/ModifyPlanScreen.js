import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SearchBar } from "@rneui/themed";
import {
  fetchData,
  getItemById,
  getItemNameById,
} from "../../services/dataService";
import { writeToDB, updateDB } from "../../firebase/firestoreHelper";
import Screen from "../../components/common/Screen";
import PressableButton from "../../components/common/PressableButton";
import commonStyles from "../../utils/style";
import { auth } from "../../firebase/firebaseSetup";
import {
  requestNotificationPermissions,
  scheduleNotification,
  cancelNotification,
} from "../../utils/helpers";
import LocationManager from "../../components/map/LocationManager";

export default function ModifyPlanScreen({ navigation, route }) {
  const { item } = route.params;
  const isModify = item ? true : false;
  const playgrounds = fetchData();
  const defaultPlanTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const [planName, setPlanName] = useState(isModify ? item.planName : "");
  const [selectedPlayground, setSelectedPlayground] = useState(
    checkPlayground(item)
  );
  const [time, setTime] = useState(
    isModify && item.time ? item.time.toDate() : defaultPlanTime
  );
  const [reminderTime, setReminderTime] = useState(
    isModify && item.reminderTime ? item.reminderTime.toDate() : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState(playgrounds);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
  const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
  const [notificationId, setNotificationId] = useState(
    isModify ? item.notificationId : null
  );
  const [location, setLocation] = useState(isModify ? item.location : null);

  const searchBarRef = useRef(null);
  const isPastTime = time < new Date();

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    if (reminderTime && time < reminderTime) {
      setReminderTime(null);
    }
  }, [time]);

  function checkPlayground(item) {
    if (isModify) {
      const playground = getItemById(item.playgroundId);
      return playground;
    } else {
      return "";
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

  const handleTimeChange = (event, selectedTime, isReminderTime = false) => {
    if (!selectedTime) return;

    if (isReminderTime) {
      if (selectedTime > time) {
        Alert.alert("Reminder time must be before or equal to plan time");
        return;
      }
      setReminderTime(selectedTime);
    } else {
      setTime(selectedTime);

      if (selectedTime < new Date()) {
        setReminderTime(null);
      }
    }
  };

  const handleSave = async () => {
    if (!planName) {
      Alert.alert("Please enter a plan name");
      return;
    }
    if (!selectedPlayground) {
      Alert.alert("Please select a playground");
      return;
    }

    try {
      if (isModify && item.notificationId) {
        await cancelNotification(item.notificationId);
      }

      let newNotificationId = null;
      if (reminderTime > new Date()) {
        newNotificationId = await scheduleNotification(
          `Playground Plan Reminder: ${planName}`,
          `Time to prepare for your plan at ${selectedPlayground.name}!`,
          reminderTime
        );
      }

      const newPlanData = {
        planName: planName,
        playgroundId: selectedPlayground.id,
        time: time,
        reminderTime: reminderTime,
        archived: false,
        owner: auth.currentUser.uid,
        notificationId: newNotificationId,
      };

      // Save planData to Firestore or any other storage
      if (!isModify) {
        // Adding the new entry to the data
        writeToDB(newPlanData, "plan");
      } else {
        // Updating the existing entry in the data
        updateDB(item.id, newPlanData, "plan");
      }
      navigation.navigate("Main", { screen: "Plan" });
    } catch (err) {
      console.error("Error saving plan:", err);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={commonStyles.header}>Location: </Text>
        <SearchBar
          placeholder="Search Playground"
          onChangeText={handleSearch}
          value={searchQuery}
          onFocus={() => setSelectedPlayground("")}
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
                  setSearchQuery("");
                  searchBarRef.current.blur();
                }}
              >
                <Text style={styles.playgroundItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        {selectedPlayground && (
          <Text style={commonStyles.planName}>
            Selected: {selectedPlayground.name}
          </Text>
        )}
        {selectedPlayground && (
          <LocationManager selectedPlace={selectedPlayground.id} />
        )}
        {/* Plan Name Input */}
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
            componentStyle={commonStyles.timeButton}
          >
            <Text>{time.toLocaleDateString()}</Text>
          </PressableButton>
          <PressableButton
            pressHandler={() => setShowTimePicker(true)}
            componentStyle={commonStyles.timeButton}
          >
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
                if (selectedDate) handleTimeChange(event, selectedDate);
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
                if (selectedTime) {
                  const newTime = new Date(time);
                  newTime.setHours(
                    selectedTime.getHours(),
                    selectedTime.getMinutes()
                  );
                  handleTimeChange(event, newTime);
                }
              }}
            />
          )}
        </View>
        {/* Date and Time Pickers for Reminder Time */}
        {!isPastTime && (
          <>
            <Text style={commonStyles.header}>Reminder Time:</Text>
            <View style={commonStyles.buttonContainer}>
              <PressableButton
                pressHandler={() => setShowReminderDatePicker(true)}
                componentStyle={commonStyles.timeButton}
              >
                <Text>
                  {reminderTime
                    ? reminderTime.toLocaleDateString()
                    : "Set Date"}
                </Text>
              </PressableButton>
              <PressableButton
                pressHandler={() => setShowReminderTimePicker(true)}
                componentStyle={commonStyles.timeButton}
              >
                <Text>
                  {reminderTime
                    ? reminderTime.toLocaleTimeString()
                    : "Set Time"}
                </Text>
              </PressableButton>
            </View>
          </>
        )}
        <View style={commonStyles.buttonContainer}>
          {showReminderDatePicker && (
            <DateTimePicker
              value={reminderTime || time}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowReminderDatePicker(false);
                if (selectedDate) handleTimeChange(event, selectedDate, true);
              }}
            />
          )}
          {showReminderTimePicker && (
            <DateTimePicker
              value={reminderTime || time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowReminderTimePicker(false);
                if (selectedTime) {
                  const newTime = new Date(reminderTime || time);
                  newTime.setHours(
                    selectedTime.getHours(),
                    selectedTime.getMinutes()
                  );
                  handleTimeChange(event, newTime, true);
                }
              }}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <PressableButton
            pressHandler={() => navigation.goBack()}
            componentStyle={commonStyles.editButton}
          >
            <Text>Cancel</Text>
          </PressableButton>
          <PressableButton
            pressHandler={handleSave}
            componentStyle={commonStyles.editButton}
          >
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  playgroundItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  searchContainer: {
    backgroundColor: "white",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchInputContainer: {
    backgroundColor: "#e0e0e0",
  },
  searchInput: {
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});
