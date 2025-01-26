import { Image, StyleSheet, Platform, View, Alert, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-gifted-charts";

export default function HomeScreen() {
  const [data, setData] = useState([]);

  // get data, convert to array, and set state
  useEffect(() => {
    const key = "heartRates";
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem(key);

        // keep the 5 most recent data points if there are more than 5
        const parsedData = data ? JSON.parse(data) : [];
        const slicedData = parsedData.slice(-5);

        // convert data to array of objects
        const dataArray = slicedData.map((item) => ({
          value: item.value,
          date: new Date(item.date),
        }));

        setData(dataArray);
      } catch (e) {
        console.error("Error getting data:", e);
      }
    };
    getData();
  });

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
      <ThemedText type="title">Last {data.length} Scans</ThemedText>
      <View style={styles.chartView}>
        <BarChart data={data} frontColor={"#1e3a8a"} />
      </View>
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
  },
  chartView: {
    backgroundColor: "white",
  },
});
