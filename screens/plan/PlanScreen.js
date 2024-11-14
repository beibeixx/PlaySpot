import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PressableButton from "../../components/common/PressableButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Screen from "../../components/common/Screen";
import DividerLine from "../../components/common/DividerLine";
import PlanList from "../../components/plan/PlanList";
import commonStyles from "../../utils/style";
import { auth } from "../../firebase/firebaseSetup";

export default function PlanScreen({ navigation }) {
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
    auth.currentUser
      ? navigation.navigate("Modify Plan", { item: null })
      : navigation.navigate("Login");
  };
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.category}>Upcoming</Text>
        {/* <DividerLine /> */}
        <PlanList timetype="upcoming" navigation={navigation} />
      </View>
      <View style={styles.container}>
        <Text style={styles.category}>Past</Text>
        <PlanList timetype="past" navigation={navigation} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
