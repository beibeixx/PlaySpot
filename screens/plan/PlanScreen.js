import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../../components/common/PressableButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Screen from "../../components/common/Screen";
import DividerLine from "../../components/common/DividerLine";
import PlanList from "../../components/plan/PlanList";
import commonStyles from "../../utils/style";
import { auth } from "../../firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";

export default function PlanScreen({ navigation }) {
  const [user, setUser] = useState(null);
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

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigation, user]);

  const createHandle = () => {
    user
      ? navigation.navigate("Modify Plan", { item: null })
      : navigation.navigate("Login");
  };

  return (
    <Screen>
      {user ? (
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
