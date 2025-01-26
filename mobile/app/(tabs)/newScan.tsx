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

import React from "react";

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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert("Scan Starting...");
              Vibration.vibrate(1000);
            }}
          >
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
