import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { fetchSearchNews } from "../utils/ApiService";
import NewsSection from "../components/NewsSection/NewsSection";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (search) => {
    if (search && search?.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);

        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your news"
          placeholderTextColor="gray"
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: "SpaceGroteskMedium",
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={25} color="red" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SpaceGroteskBold",
            color: "#333",
          }}
        >
          {results?.length} News for {searchTerm}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <NewsSection newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}
