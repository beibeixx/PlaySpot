import { StyleSheet, Text, View, FlatList, Image, Alert, ScrollView } from "react-native";
import React, { useEffect } from "react";
import {
  getItemNameById,
  getImagesById,
  getAddressById,
} from "../../services/dataService";
import {
  writeToDB,
  deleteFromDB,
  updateDB,
} from "../../firebase/firestoreHelper";
import formatDate from "../../utils/helpers";
import PressableButton from "../../components/common/PressableButton";
import Screen from "../../components/common/Screen";
import commonStyles from "../../utils/style";
import { auth } from "../../firebase/firebaseSetup";
import WeatherSection from "./WeatherSection";

export default function PlanDetailsScreen({ navigation, route }) {
  const { item } = route.params;
  const images = getImagesById(item.playgroundId);
  const playgroundName = getItemNameById(item.playgroundId);
  const pastMode = item.time.toDate() < new Date();
  const diffDays = Math.floor(
    (new Date() - item.time.toDate()) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    navigation.setOptions({
      title: item.planName,
    });
  }, [navigation, item]);

  function renderImage({ item }) {
    return <Image source={{ uri: item }} style={{ width: 350, height: 200 }} />;
  }

  function handleEdit() {
    navigation.navigate("Modify Plan", { item });
  }

  function pressDelete() {
    Alert.alert("Important", "Are you sure you want to delete this plan?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          deleteFromDB(item.id, "plan");
          navigation.goBack();
        },
      },
    ]);
  }

  function handleArchive() {
    // Archive
    const newMemoryData = {
      memoryName: item.planName,
      playgroundId: item.playgroundId,
      time: item.time,
      owner: auth.currentUser.uid,
    };
    writeToDB(newMemoryData, "memory");

    // Update the plan to be archived
    const updatedPlanData = {
      ...item,
      archived: true,
    };
    updateDB(item.id, updatedPlanData, "plan");

    // Navigate back to the main screen
    navigation.navigate("Main", { screen: "Memory" });
  }

  function pressArchive() {
    Alert.alert("Important", "Are you sure you want to archive this plan?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          handleArchive();
          navigation.navigate("Main", { screen: "Memory" });
        },
      },
    ]);
  }

  return (
    <ScrollView>
      <Text style={commonStyles.header}>Location</Text>
      <Text>{playgroundName}</Text>
      <Text style={commonStyles.header}>Time</Text>
      <Text>{formatDate(item.time.toDate())}</Text>

      {!pastMode && (
        <View>
          <Text style={commonStyles.header}>Current Weather</Text>
          <WeatherSection address={getAddressById(item.playgroundId)} />
          {Math.abs(diffDays) <= 5 ? (
            <View>
              <Text style={commonStyles.header}>Weather on your plan date</Text>
              <WeatherSection
                address={getAddressById(item.playgroundId)}
                time={item.time}
              />
            </View>
          ) : (
            <Text style={commonStyles.header}>Weather on your plan date will be shown 5 days before your plan</Text>
          )}
        </View>
      )}

      <View style={styles.galleryContainer}>
        <FlatList
          data={images} // Assuming item.images is an array of image URLs
          renderItem={renderImage}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {!pastMode && (
        <View style={styles.buttonContainer}>
          <PressableButton
            pressHandler={pressDelete}
            componentStyle={commonStyles.alertButton}
          >
            <Text>Delete</Text>
          </PressableButton>
          <PressableButton
            pressHandler={handleEdit}
            componentStyle={commonStyles.editButton}
          >
            <Text>Edit</Text>
          </PressableButton>
        </View>
      )}
      {pastMode && (
        <View style={commonStyles.buttonContainer}>
          <PressableButton
            pressHandler={pressDelete}
            componentStyle={commonStyles.alertButton}
          >
            <Text>Delete</Text>
          </PressableButton>
          <PressableButton
            pressHandler={pressArchive}
            disabled={item.archived}
            componentStyle={commonStyles.editButton}
          >
            <Text>Archive</Text>
          </PressableButton>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
