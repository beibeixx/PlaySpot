import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, database } from "../../firebase/firebaseSetup";
import PressableButton from "../../components/common/PressableButton";
import ItemImage from "../../components/plan/ItemImage";
import { useSelector } from "react-redux";
import { memoryStyles } from "../../styles/screens/memory";

export default function MemoryScreen({ navigation }) {
  const [memories, setMemories] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !auth.currentUser) {
      setMemories([]);
      return;
    }
    const unsubscribe = onSnapshot(
      collection(database, "memory"),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({
            ...docSnapshot.data(),
            id: docSnapshot.id,
            time: docSnapshot.data().time,
          });
        });
        setMemories(newArray);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [isAuthenticated]);

  function renderItem({ item }) {
    return (
      <PressableButton
        pressHandler={() => navigation.navigate("Memory Details", { item })}
        componentStyle={memoryStyles.planCard}
      >
        <ItemImage item={item} screen="memory" />
        <View style={memoryStyles.cardContent}>
          <Text style={memoryStyles.planName}>{item.memoryName}</Text>
          <Text style={memoryStyles.timeText}>
            {new Date(item.time.toDate()).toLocaleString()}
          </Text>
        </View>
      </PressableButton>
    );
  }

  if (memories.length === 0) {
    return (
      <View style={memoryStyles.emptyContainer}>
        <Text style={memoryStyles.emptyText}>
          {isAuthenticated
            ? `No memory yet. \n Acheive one of your plan to create memories!`
            : "Please login to view your Memories"}
        </Text>
      </View>
    );
  }

  return (
    <View style={memoryStyles.mainContainer}>
    <FlatList
      data={memories}
      renderItem={renderItem}
      keyExtractor={(item) => item.time}
      contentContainerStyle={memoryStyles.listContainer}
      showsVerticalScrollIndicator={false}
    />
    </View>
  );
}

const styles = StyleSheet.create({});
