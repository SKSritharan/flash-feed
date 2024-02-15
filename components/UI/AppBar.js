import React, { useState } from "react";
import {
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function AppBar() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View className="">
        <Text
          className="font-spaceGroteskBold text-2xl text-green-800 dark:text-white font-extrabold uppercase"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Flash Feed
        </Text>
      </View>

      <View
        className="flex-row space-x-4 rounded-full justify-center items-center"
        style={{ flexDirection: "row", justifyContent: "center" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 dark:bg-red-800  rounded-full p-2"
        >
          <View
            className="flex-row items-center"
            style={{ flexDirection: "row" }}
          >
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 20,
                paddingLeft: 15,
                marginRight: 10,
                color: colorScheme == "dark" ? "white" : "black",
              }}
              placeholder="Search"
              placeholderTextColor={colorScheme == "dark" ? "white" : "gray"}
            />

            <MagnifyingGlassIcon
              size={25}
              strokeWidth={2}
              color={colorScheme == "dark" ? "white" : "red"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleColorScheme}>
          {colorScheme == "dark" ? (
            <Ionicons name="sunny" size={25} strokeWidth={2} color="yellow" />
          ) : (
            <Ionicons name="moon" size={25} strokeWidth={2} color="gray" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
