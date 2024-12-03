import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { datetimePickerStyles } from "../../styles/components/datetimePicker";
import { setDateWithoutSeconds } from "../../utils/helpers";

export default function CommonDateTimePicker({
  isVisible,
  onClose,
  onSelect,
  currentValue,
  isReminderPicker = false,
}) {
  const [tempDate, setTempDate] = useState(setDateWithoutSeconds(currentValue || new Date()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    if (selectedDate) {
      // Update only the date portion
      const updatedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        tempDate.getHours(),
        tempDate.getMinutes()
      );
      setTempDate(updatedDate);
      setShowDatePicker(false);
      setShowTimePicker(true); // Show time picker next
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    if (selectedTime) {
      // Update only the time portion
      const updatedDate = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      setTempDate(updatedDate);
      setShowTimePicker(false);
    }
  };

  const confirmSelection = () => {
    onSelect(tempDate);
    onClose();
  };

  const quickOptions = isReminderPicker
    ? [
        { label: "15 mins before", value: 15 * 60 * 1000 },
        { label: "30 mins before", value: 30 * 60 * 1000 },
        { label: "1 hour before", value: 60 * 60 * 1000 },
        { label: "1 day before", value: 24 * 60 * 60 * 1000 },
      ]
    : [
        { label: "Today", value: setDateWithoutSeconds(new Date()) },
        {
          label: "Tomorrow",
          value: setDateWithoutSeconds(new Date(Date.now() + 24 * 60 * 60 * 1000)),
        },
        {
          label: "Next week",
          value: setDateWithoutSeconds(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        },
      ];

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={datetimePickerStyles.modalContainer}>
        <View style={datetimePickerStyles.pickerContainer}>
          <View style={datetimePickerStyles.header}>
            <Text style={datetimePickerStyles.title}>
              {isReminderPicker ? "Select Reminder Time" : "Select Plan Time"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={datetimePickerStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={datetimePickerStyles.quickOptionsContainer}
          >
            {quickOptions.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={datetimePickerStyles.quickOption}
                onPress={() => {
                  const newDate = isReminderPicker
                    ? new Date(currentValue.getTime() - option.value)
                    : option.value;
                  setTempDate(newDate);
                  onSelect(newDate);
                }}
              >
                <Text style={datetimePickerStyles.quickOptionText}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {Platform.OS === "ios" ? (
            <>
              <DateTimePicker
                value={tempDate}
                mode="datetime"
                display="spinner"
                onChange={(event, date) => {
                  if (date) {
                    const dateWithoutSeconds = setDateWithoutSeconds(date);
                    setTempDate(dateWithoutSeconds);
                    onSelect(dateWithoutSeconds);
                  }
                }}
              />
              <TouchableOpacity
                style={datetimePickerStyles.confirmButton}
                onPress={confirmSelection}
              >
                <Text style={datetimePickerStyles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {showDatePicker && (
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={tempDate}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}

              {!showDatePicker && !showTimePicker && (
                <>
                  <TouchableOpacity
                    style={datetimePickerStyles.confirmButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={datetimePickerStyles.confirmText}>
                      {tempDate.toLocaleDateString()} {tempDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={datetimePickerStyles.confirmButton}
                    onPress={confirmSelection}
                  >
                    <Text style={datetimePickerStyles.confirmText}>Confirm</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}