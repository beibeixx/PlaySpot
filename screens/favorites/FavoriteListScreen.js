import { FlatList, StyleSheet, Text, View, Alert} from "react-native";
import React, { useState, useEffect } from "react";
import FavoriteItemsList from "../../components/favorite/FavoriteItemsList";
import { deleteFromDB } from "../../firebase/firestoreHelper";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, database } from "../../firebase/firebaseSetup";

export default function FavoriteListScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const listerToFirebase = onSnapshot(
      collection(database, "favorites"),
      (querySnapshot) => {
        let newData = [];
        querySnapshot.forEach((docSnapshot) => {
          newData.push({
            ...docSnapshot.data(),
            playgroundID: docSnapshot.data().playgroundID,
            id: docSnapshot.id,
          });
        });
        setData(newData);
      }
    );
    return () => listerToFirebase();
  }, []);

  const handleFavoriteRomove = (removeID) => {
    deleteFromDB(removeID, "favorites");
    Alert.alert("Removed from favorites!");
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <FavoriteItemsList
            playgroundItem={item}
            navigation={navigation}
            removeHandler={handleFavoriteRomove}
          />
        );
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({});
