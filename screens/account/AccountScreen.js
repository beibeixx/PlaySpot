import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseSetup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { setUser, clearUser } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const favoriteHandle = () => {
    navigation.navigate("Favorite List");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={styles.content}>
          <Text style={styles.email}>{auth.currentUser.email}</Text>
          <Pressable style={styles.button} onPress={favoriteHandle}>
            <Text style={styles.buttonText}>Favorite List</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.message}>
            Login to get access to all the features!
          </Text>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  content: {
    gap: 15,
    alignItems: "center",
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});
