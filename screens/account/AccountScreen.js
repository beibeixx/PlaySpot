import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../../firebase/firebaseSetup";

export default function AccountScreen() {
  return (
    <View>
      {auth.currentUser ? (
        <View>
          <Text>{auth.currentUser.email}</Text>
          <Text>{auth.currentUser.uid}</Text>
        </View>
      ) : (
        <View>
          {/* FOR TEST FAV ONLY */}
          <Pressable>
            <Text>Favorite List</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
