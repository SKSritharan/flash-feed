import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function TitleBar({ label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.viewAll}>See all</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="#0080FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "NunitoBold",
    fontSize: 20,
    color: "black",
  },
  viewAll: {
    fontFamily: "NunitoRegular",
    fontWeight: "bold",
    fontSize: 14,
    color: "#0080FF",
  },
});
