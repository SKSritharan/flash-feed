import React from "react";
import {
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function AppBar() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flash Feed</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.searchButton}
        >
          <View style={styles.searchInputContainer}>
            <MagnifyingGlassIcon
              size={25}
              strokeWidth={2}
              color={colorScheme == "dark" ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={{}} style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  title: {
    fontFamily: "NunitoBold",
    fontSize: 20,
    color: "#FF3A44",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBtn: {
    backgroundColor: "#FF3A44",
    borderRadius: 20,
    marginLeft: 12,
    padding: 6,
  },

  searchButton: {
    borderRadius: 20,
    padding: 2,
    marginLeft: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
});
