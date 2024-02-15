import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import NewsSection from "../components/NewsSection/NewsSection";

export default function FavouritesScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  // const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    const urls = savedArticles.map((item) => item.url);
    setUrlList(urls);
  }, [savedArticles]);

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          // const isArticleBookmarkedList = urlList.map((url) =>
          //   savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          // );

          // setBookmarkStatus(isArticleBookmarkedList);
          setSavedArticles(savedArticlesArray);
        } catch (error) {
          // console.log("Error loading saved articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList])
  );

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
      console.log("Clear all saved articles");
    } catch (error) {
      // console.log("Error clearing saved articles", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 5, backgroundColor: "#fff" }}>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "NunitoBold",
            fontSize: 20,
            color: colorScheme == "dark" ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          style={{
            backgroundColor: "#FF3A44",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "NunitoBold",
              fontSize: 16,
              color: "white",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: hp(2) }} className="space-y-2 ">
        <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
          <NewsSection newsProps={savedArticles} label="Search Results" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
