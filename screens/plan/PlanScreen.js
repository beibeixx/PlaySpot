import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../../components/common/PressableButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Screen from "../../components/common/Screen";
import PlanList from "../../components/plan/PlanList";
import commonStyles from "../../utils/style";
import { useSelector } from "react-redux";

export default function PlanScreen({ navigation }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Set header options with a Pressable button
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressHandler={createHandle}
            componentStyle={commonStyles.iconButton}
          >
            <MaterialIcons name="add-box" size={28} color="white" />
          </PressableButton>
        );
      },
    });
  }, [navigation]);

  const createHandle = () => {
    isAuthenticated
      ? navigation.navigate("Modify Plan", { item: null })
      : navigation.navigate("Login");
  };

  // to be changed for better vision result
  return (
    <View style={styles.mainContainer}>
      <View style={styles.toggleContainer}>
        <PressableButton
          pressHandler={() => setActiveTab("upcoming")}
          componentStyle={[
            styles.toggleButton,
            activeTab === "upcoming" && styles.activeToggle,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "upcoming" && styles.activeText,
            ]}
          >
            Upcoming
          </Text>
        </PressableButton>
        <PressableButton
          pressHandler={() => setActiveTab("past")}
          componentStyle={[
            styles.toggleButton,
            activeTab === "past" && styles.activeToggle,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "past" && styles.activeText,
            ]}
          >
            Past
          </Text>
        </PressableButton>
      </View>
      <View style={styles.container}>
        <PlanList timetype={activeTab} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f4c7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f8f4c7",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f8f4c7",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0e68c",
    borderWidth: 1,
    borderColor: "#c48d3f",
  },
  activeToggle: {
    backgroundColor: "#c48d3f",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#c48d3f",
  },
  activeText: {
    color: "#ffffff",
  },
});
