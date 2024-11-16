import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../../components/common/PressableButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Screen from "../../components/common/Screen";
import PlanList from "../../components/plan/PlanList";
import commonStyles from "../../utils/style";
import { useSelector } from "react-redux";

export default function PlanScreen({ navigation }) {

  const { isAuthenticated } = useSelector((state) => state.auth)

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
    <Screen>
      {isAuthenticated ? (
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.category}>Upcoming</Text>
            {/* <DividerLine /> */}
            <PlanList timetype="upcoming" navigation={navigation} />
          </View>
          <View style={styles.container}>
            <Text style={styles.category}>Past</Text>
            <PlanList timetype="past" navigation={navigation} />
          </View>
        </View>
      ) : (
        <View style={styles.mainContainer}></View>
      )}
    </Screen>
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
  category: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 5,
    color: "#c48d3f",
    backgroundColor: "#f8f4c7",
  },
});
