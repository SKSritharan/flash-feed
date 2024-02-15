import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.profileItem}>
          <Ionicons
            name="person-outline"
            size={24}
            color={colorScheme == "dark" ? "white" : "black"}
          />
          <Text style={styles.profileItemText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileItem}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colorScheme == "dark" ? "white" : "black"}
          />
          <Text style={styles.profileItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileItem}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={colorScheme == "dark" ? "white" : "black"}
          />
          <Text style={styles.profileItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  profileSection: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profileItemText: {
    marginLeft: 16,
    fontSize: 18,
    color: "#333",
  },
});
