import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
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

  const {
    data: discoverNews,
    isLoading: isDiscoverLoading,
    refetch,
  } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  useEffect(() => {
    const filteredArticles = discoverNews?.articles?.filter(
      (article) => article.title !== "[Removed]"
    );
    setWithoutRemoved(filteredArticles || []);
  }, [discoverNews]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    // Trigger a manual refetch to update the data based on the new category
    refetch();
  };

  return (
    <View>
      <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
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
  );
}
