import {
  StyleSheet,
  Image,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Vibration,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import AsyncStorage from '@react-native-async-storage/async-storage';

import React from "react";

const newScanFunction = async () => {

  const key = 'heartRates';

  Alert.alert("Scan Starting...");
  Vibration.vibrate(1000);

  try {
    // clear old data
    // await AsyncStorage.removeItem(key);

    // get old data
    const data = await AsyncStorage.getItem(key);

    // append new data to old data
    const newData = data ? JSON.parse(data) : [];
    newData.push({ value: Math.random()*50, date: Date.now() });

    // save data
    await AsyncStorage.setItem(key, JSON.stringify(newData));
    console.log("Data saved");

  } catch (e) {
    console.error("Error saving data:", e);
  }
};

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/heart.png")}
          style={styles.newScanImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">New Scan</ThemedText>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={newScanFunction}>
            <Text style={styles.buttonText}>Start Scan</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
  newScanImage: {
    // fill the header
    width: "0%",
    height: "0%",
    resizeMode: "contain",
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "inherit",
    marginTop: "50%",
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
