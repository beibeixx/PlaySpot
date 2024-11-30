// Add or Update plan
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  SafeAreaView,
  ScrollView
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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { modifyPlanStyles } from "../../styles/screens/modifyPlan";
import { colors } from "../../styles/helper/colors";

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

  useEffect(() => {
    if (selectedPlayground) {
      console.log("Selected Playground changed:", selectedPlayground.address);
    }
  }, [selectedPlayground]);

  function checkPlayground(item) {
    if (isModify) {
      const playground = getItemById(item.playgroundId);
      return playground;
    } else {
      return "";
    }
  }

  const selectHandler = (selectedPlayground) => {
    console.log("Selected", selectedPlayground);
    setSelectedPlayground(selectedPlayground);
  };

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
    <View style={modifyPlanStyles.container}>
      <ScrollView
        contentContainerStyle={modifyPlanStyles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Section */}
        <View style={modifyPlanStyles.searchSection}>
          <SearchBar
            placeholder="Search Playground"
            onChangeText={handleSearch}
            value={searchQuery}
            onFocus={() => setSelectedPlayground(null)}
            ref={searchBarRef}
            containerStyle={modifyPlanStyles.searchContainer}
            inputContainerStyle={modifyPlanStyles.searchInputContainer}
            inputStyle={modifyPlanStyles.searchInput}
          />

          {searchQuery ? (
            <View style={modifyPlanStyles.playgroundList}>
              {filteredPlaygrounds.map((playground) => (
                <TouchableOpacity
                  key={playground.id}
                  style={modifyPlanStyles.playgroundItem}
                  onPress={() => {
                    setSelectedPlayground(playground);
                    setSearchQuery("");
                    searchBarRef.current?.blur();
                  }}
                >
                  <Text style={modifyPlanStyles.playgroundItemText}>
                    {playground.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <TouchableOpacity
              style={modifyPlanStyles.mapSelectButton}
              onPress={() =>
                navigation.navigate("Playground Map", { selectHandler })
              }
            >
              <FontAwesome5
                name="map-marked-alt"
                size={20}
                color={colors.primary[600]}
              />
              <Text style={modifyPlanStyles.mapSelectText}>Select on Map</Text>
            </TouchableOpacity>
          )}

          {selectedPlayground && (
            <View style={modifyPlanStyles.selectedLocation}>
              <Text style={modifyPlanStyles.selectedLocationText}>
                {selectedPlayground.name}
              </Text>
              <LocationManager selectedPlace={selectedPlayground.id} />
            </View>
          )}
        </View>

        {/* Plan Name Section */}
        <View style={modifyPlanStyles.section}>
          <Text style={modifyPlanStyles.sectionTitle}>Plan Name</Text>
          <TextInput
            placeholder="Enter plan name"
            value={planName}
            onChangeText={setPlanName}
            style={modifyPlanStyles.input}
            placeholderTextColor={colors.text.placeholder}
          />
        </View>

        {/* Plan Time Section */}
        <View style={modifyPlanStyles.section}>
          <Text style={modifyPlanStyles.sectionTitle}>Time</Text>
          <View style={modifyPlanStyles.timeContainer}>
            <PressableButton
              pressHandler={() => setShowDatePicker(true)}
              componentStyle={modifyPlanStyles.timeButton}
            >
              <Text style={modifyPlanStyles.timeButtonText}>
                {time.toLocaleDateString()}
              </Text>
            </PressableButton>
            <PressableButton
              pressHandler={() => setShowTimePicker(true)}
              componentStyle={modifyPlanStyles.timeButton}
            >
              <Text style={modifyPlanStyles.timeButtonText}>
                {time.toLocaleTimeString()}
              </Text>
            </PressableButton>
          </View>
        </View>

        {/* Reminder Time Section */}
        {!isPastTime && (
          <View style={modifyPlanStyles.section}>
            <Text style={modifyPlanStyles.sectionTitle}>
              Reminder Time (Optional)
            </Text>
            <View style={modifyPlanStyles.timeContainer}>
              <PressableButton
                pressHandler={() => setShowReminderDatePicker(true)}
                componentStyle={modifyPlanStyles.timeButton}
              >
                <Text style={modifyPlanStyles.timeButtonText}>
                  {reminderTime
                    ? reminderTime.toLocaleDateString()
                    : "Set Date"}
                </Text>
              </PressableButton>
              <PressableButton
                pressHandler={() => setShowReminderTimePicker(true)}
                componentStyle={modifyPlanStyles.timeButton}
              >
                <Text style={modifyPlanStyles.timeButtonText}>
                  {reminderTime
                    ? reminderTime.toLocaleTimeString()
                    : "Set Time"}
                </Text>
              </PressableButton>
            </View>
          </View>
        )}

        {/* DateTimePicker Components */}
        {(showDatePicker ||
          showTimePicker ||
          showReminderDatePicker ||
          showReminderTimePicker) && (
          <DateTimePicker
            value={
              showReminderDatePicker || showReminderTimePicker
                ? reminderTime || time
                : time
            }
            mode={showDatePicker || showReminderDatePicker ? "date" : "time"}
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setShowTimePicker(false);
              setShowReminderDatePicker(false);
              setShowReminderTimePicker(false);

              if (selectedDate) {
                if (showReminderDatePicker || showReminderTimePicker) {
                  handleTimeChange(event, selectedDate, true);
                } else {
                  handleTimeChange(event, selectedDate);
                }
              }
            }}
          />
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={modifyPlanStyles.actionContainer}>
        <PressableButton
          pressHandler={() => navigation.goBack()}
          componentStyle={modifyPlanStyles.cancelButton}
        >
          <Text style={modifyPlanStyles.cancelButtonText}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressHandler={handleSave}
          componentStyle={modifyPlanStyles.submitButton}
        >
          <Text style={modifyPlanStyles.submitButtonText}>
            {route.params.item ? "Update" : "Create"}
          </Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
