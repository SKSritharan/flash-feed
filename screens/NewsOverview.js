import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Loading from "../components/UI/Loading";
import AppBar from "../components/UI/AppBar";
import TitleBar from "../components/UI/TitleBar";
import { fetchLatestNews } from "../utils/ApiService";
import LatestNews from "../components/LatestNews/LatestNewsList";
import NewsCategory from "../components/NewsCategory.js/NewsCategory";

const NewsOverview = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const { data, isLoading: isLatestLoading } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
  });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        <AppBar />

        {isLatestLoading ? (
          <Loading />
        ) : (
          <View className="">
            <TitleBar label="Latest News" />
            <LatestNews label="Latest News" data={data.articles} />
          </View>
        )}

        <View style={{ marginTop: hp(2) }}>
          <NewsCategory />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewsOverview;
