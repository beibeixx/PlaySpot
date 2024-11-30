//Plan detail page to display specific data from Plan collection
import {
  Text,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
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
import { formatDate } from "../../utils/helpers";
import PressableButton from "../../components/common/PressableButton";
import { auth } from "../../firebase/firebaseSetup";
import WeatherSection from "./WeatherSection";
import LocationManager from "../../components/map/LocationManager";
import { planDetailStyles } from "../../styles/screens/planDetail";
import { LinearGradient } from "expo-linear-gradient";
import { spacing } from "../../styles/helper/spacing";

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
      headerTransparent: true,
      headerBackground: () => (
        <View style={{ flex: 1, backgroundColor: "transparent" }} />
      ),
    });
  }, [navigation, item]);

  function renderImage({ item }) {
    <View style={planDetailStyles.imageContainer}>
      <Image source={{ uri: item }} style={planDetailStyles.image} />
    </View>;
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
    <View style={planDetailStyles.container}>
      {/* Header Image Section */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={planDetailStyles.imageContainer}>
          <Image
            source={{ uri: images[0] }}
            style={planDetailStyles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)"]}
            style={planDetailStyles.gradient}
          />
        </View>

        <View style={planDetailStyles.contentContainer}>
          {/* Content Section */}
          <View style={planDetailStyles.section}>
            <Text style={planDetailStyles.sectionTitle}>Time</Text>
            <Text style={planDetailStyles.timeText}>
              {formatDate(item.time.toDate())}
            </Text>
          </View>

          {/* Location Section */}
          <View style={planDetailStyles.section}>
            <Text style={planDetailStyles.sectionTitle}>Location</Text>
            <Text style={planDetailStyles.locationName}>{playgroundName}</Text>
            <View style={planDetailStyles.mapContainer}>
              <LocationManager selectedPlace={item.playgroundId} />
            </View>
          </View>

          {/* Weather Sections */}
          {!pastMode && (
            <View style={planDetailStyles.weatherContainer}>
              <Text style={planDetailStyles.weatherTitle}>Current Weather</Text>
              <WeatherSection address={getAddressById(item.playgroundId)} />

              {Math.abs(diffDays) <= 5 ? (
                <>
                  <Text
                    style={[
                      planDetailStyles.weatherTitle,
                      { marginTop: spacing.lg },
                    ]}
                  >
                    Weather on your plan date
                  </Text>
                  <WeatherSection
                    address={getAddressById(item.playgroundId)}
                    time={item.time}
                  />
                </>
              ) : (
                <Text style={planDetailStyles.warningText}>
                  Weather on your plan date will be shown 5 days before your
                  plan
                </Text>
              )}
            </View>
          )}

          {/* Buttons */}
          <View style={planDetailStyles.buttonContainer}>
            <PressableButton
              pressHandler={pressDelete}
              componentStyle={planDetailStyles.deleteButton}
            >
              <Text style={planDetailStyles.buttonText}>Delete</Text>
            </PressableButton>

            {!pastMode ? (
              <PressableButton
                pressHandler={handleEdit}
                componentStyle={planDetailStyles.editButton}
              >
                <Text style={planDetailStyles.buttonText}>Edit</Text>
              </PressableButton>
            ) : (
              <PressableButton
                pressHandler={pressArchive}
                disabled={item.archived}
                componentStyle={planDetailStyles.archiveButton}
              >
                <Text style={planDetailStyles.buttonText}>Archive</Text>
              </PressableButton>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
