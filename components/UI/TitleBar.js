import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function TitleBar({ label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.viewAll}>View all</Text>
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
    fontFamily: "SpaceGroteskBold",
    fontSize: 20,
    color: "black",
  },
  viewAll: {
    fontFamily: "SpaceGroteskMedium",
    fontSize: 14,
    color: "#525252",
  },
});
