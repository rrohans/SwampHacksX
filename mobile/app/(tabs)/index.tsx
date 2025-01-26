import { Image, StyleSheet, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import Card from "@/components/Card";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/heart.png")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Summary</ThemedText>
      </ThemedView>
      <ThemedView style={styles.summaryView}>
        <Card title="Most Recent Heart Rate" subtitle="100 BPM" />
        <Card title="Most Recent Body Temperature" subtitle="98.2 F" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerImage: {
    // fill the header
    width: "100%",
    height: "125%",
    resizeMode: "contain",
    backgroundColor: "red",
  },
  summaryView: {
    flexDirection: "row",
    flex: 1,
    margin: "auto",
    width: "70%",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    padding: 16,
  }
});
