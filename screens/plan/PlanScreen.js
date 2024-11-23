import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../../components/common/PressableButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Screen from "../../components/common/Screen";
import PlanList from "../../components/plan/PlanList";
import { useSelector } from "react-redux";
import { planStyles } from "../../styles/screens/plan";
import { spacing } from "../../styles/helper/spacing";

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
            componentStyle={planStyles.addButton}
          >
            <MaterialIcons name="add-box" size={spacing.xl} color="white" />
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

  return (
    <View style={planStyles.mainContainer}>
      <View style={planStyles.toggleContainer}>
        <PressableButton
          pressHandler={() => setActiveTab("upcoming")}
          componentStyle={[
            planStyles.toggleButton,
            activeTab === "upcoming" && planStyles.activeToggle,
          ]}
        >
          <Text
            style={[
              planStyles.toggleText,
              activeTab === "upcoming" && planStyles.activeText,
            ]}
          >
            Upcoming
          </Text>
        </PressableButton>
        <PressableButton
          pressHandler={() => setActiveTab("past")}
          componentStyle={[
            planStyles.toggleButton,
            activeTab === "past" && planStyles.activeToggle,
          ]}
        >
          <Text
            style={[
              planStyles.toggleText,
              activeTab === "past" && planStyles.activeText,
            ]}
          >
            Past
          </Text>
        </PressableButton>
      </View>
      <PlanList timetype={activeTab} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
