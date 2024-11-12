import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase/firebaseSetup";
import { getItemImageById, getItemNameById } from "../../services/dataService";

export default function FavoriteItemsList({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const listerToFirebase = onSnapshot(
      collection(database, "favorites"),
      (querySnapshot) => {
        let newData = [];
        querySnapshot.forEach((docSnapshot) => {
          newData.push({
            ...docSnapshot.data(),
            id: docSnapshot.data().playgroundID,
          });
        });
        setData(newData);
      }
    );
    return () => listerToFirebase();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
        <Pressable
          onPress={() =>
            navigation.navigate("Playground Details", { itemID: item.id })
          }
        >
          <View>
            <Image
              source={{ uri: getItemImageById(item.id) }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{getItemNameById(item.id)}</Text>
          </View>
        </Pressable>
        <Pressable>
            
        </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
