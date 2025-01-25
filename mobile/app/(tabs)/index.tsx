import "../../global.css";

import { View, Text, SafeAreaView } from "react-native";

import { StatusBar } from "expo-status-bar";
import React from "react";
import Card from "@/components/Card";

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView className="bg-white h-screen w-screen">
        <StatusBar style="dark" />
        <StatusBar style="dark" />
        <Card></Card>
      </SafeAreaView>
    </>
  );
}
