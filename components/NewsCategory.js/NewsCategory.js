import { View, ScrollView } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import Loading from "../UI/Loading";
import { CATEGORIES } from "../../data/dummy_data";
import CategoryFilterButton from "./CategoryFilterButton";
import NewsSection from "../NewsSection/NewsSection";
import { fetchDiscoverNews } from "../../utils/ApiService";

export default function NewsCategory() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const navigation = useNavigation();
  const [withoutRemoved, setWithoutRemoved] = useState([]);

  useEffect(() => {}, [activeCategory]);

  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category) => {
    setActiveCategory(category);

    const filteredArticles = discoverNew?.articles.filter(
      (article) => article.title !== "[Removed]"
    );

    setWithoutRemoved(filteredArticles || []);
  };

  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        <View className="flex-row mx-4">
          <CategoryFilterButton
            categories={CATEGORIES}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View className="h-full">
          {isDiscoverLoading ? (
            <View className="justify-center items-center">
              <Loading />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}
            >
              <NewsSection newsProps={withoutRemoved} label="Discovery" />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
