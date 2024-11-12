import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";

export default function AccountScreen({ navigation }) {

  const [isUserloggedin, setIsUserLoggedin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedin(true);
      } else {
        setIsUserLoggedin(false);
      }
    });
  }, []);

  const favoriteHandle = () => {
    navigation.navigate("Favorite List");
  };

  const handleLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <View sytle={styles.container}>
      {isUserloggedin ? (
        <View>
          <Text>{auth.currentUser.email}</Text>
          <Pressable onPress={favoriteHandle}>
            <Text>Favorite List</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text>Login to get access to all the features!</Text>
          <Pressable onPress={handleLogin}>
            <Text>Login</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
