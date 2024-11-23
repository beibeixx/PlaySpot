import { FlatList, Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../firebase/firebaseSetup";
import PressableButton from "../common/PressableButton";
import ItemImage from "./ItemImage";
import { formatDate } from "../../utils/helpers";
import { auth } from "../../firebase/firebaseSetup";
import { useSelector } from "react-redux";
import { planListStyles } from "../../styles/components/planList";

export default function PlanList({ timetype, navigation }) {
  const [plans, setPlans] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !auth.currentUser) {
      setPlans([]);
      return;
    }
    const now = new Date();
    const planQuery = query(
      collection(database, "plan"),
      where("owner", "==", auth.currentUser.uid),
      where("time", timetype === "upcoming" ? ">=" : "<", now)
    );
    const unsubscribePlans = onSnapshot(planQuery, (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        newArray.push({
          ...docSnapshot.data(),
          id: docSnapshot.id,
          time: docSnapshot.data().time,
        });
      });
      if (timetype === "past") {
        newArray.sort((a, b) => b.time.seconds - a.time.seconds); // Sort in reverse chronological order
      } else {
        newArray.sort((a, b) => a.time.seconds - b.time.seconds); // Sort in chronological order
      }
      setPlans(newArray);
    });
    return () => {
      unsubscribePlans();
    };
  }, [timetype, isAuthenticated]);

  function renderItem({ item }) {
    return (
      <PressableButton
        pressHandler={() => navigation.navigate("Plan Details", { item })}
        componentStyle={planListStyles.planCard}
      >
        <ItemImage item={item} screen="plan"/>
        <View style={planListStyles.cardContent}>
          <Text style={planListStyles.planName}>{item.planName}</Text>
          <Text style={planListStyles.timeText}>
            {formatDate(item.time.toDate())}
          </Text>
        </View>
      </PressableButton>
    );
  }

  if (plans.length === 0) {
    return (
      <View style={planListStyles.emptyContainer}>
        <Text style={planListStyles.emptyText}>
          {isAuthenticated
            ? `No ${timetype} plans yet`
            : "Please login to view your plans"}
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={plans}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={planListStyles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});
