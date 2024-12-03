import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
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
            onPress={() => {
              onSelect(tempDate);
              onClose();
            }}
          >
            <Text style={datetimePickerStyles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
