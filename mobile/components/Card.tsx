import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientCardProps {
  title: string;
  subtitle?: string;
  colors?: string[];
  style?: object;
}

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  subtitle,
  style,
}) => {
  return (
    <LinearGradient
      colors={["#ef4444", "#991b1b"]}
      style={[styles.card, style]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    aspectRatio: 2, // Ensures the card is square
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#f5f5f5",
    marginTop: 4,
  },
});

export default GradientCard;
