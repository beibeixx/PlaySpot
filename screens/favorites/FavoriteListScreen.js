import { FlatList, StyleSheet, Text, View, Alert} from "react-native";
import React, { useState, useEffect } from "react";
import FavoriteItemsList from "../../components/favorite/FavoriteItemsList";
import { deleteFromDB } from "../../firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../../firebase/firebaseSetup";
import { useSelector } from "react-redux";
import { favoriteStyles } from "../../styles/screens/favorite";

export default function FavoriteListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) { 
    const listerToFirebase = onSnapshot(
      query(
        collection(database, "favorites"),
        where("owner", "==", auth.currentUser.uid)
      ),
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
  }
  }, []);

  const handleFavoriteRomove = (removeID) => {
    deleteFromDB(removeID, "favorites");
    Alert.alert("Removed from favorites!");
  };

  if (data.length === 0) {
    return (
      <View style={favoriteStyles.emptyContainer}>
        <Text style={favoriteStyles.emptyText}>
          No favorite playground yet
        </Text>
      </View>
    );
  }

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
