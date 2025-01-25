import "../global.css";

import { View, Text } from "react-native";
import React from "react";

import Svg, { Path } from "react-native-svg";

import { LinearGradient } from 'expo-linear-gradient';


// Smaller visible heart with shadow and margin
export const SmallHeart = () => (
  <Svg
    width={32} // 8 * 4
    height={32} // 8 * 4
    style={{
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // For Android shadow
    }}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="red"
    />
  </Svg>
);

export default function HomeScreen() {
  return (
    <>
      <View className="relative">
        <View className="absolute left-0 right-0 h-1/2 bg-red-500">
          <SmallHeart />
        </View>
        <Text className="text-4xl text-gray-600 font-semibold p-16 px-24 rounded-3xl">
          At a glance
        </Text>
      </View>
    </>
  );
}
