import { View, StyleSheet, Text, ScrollView } from "react-native";
import LatestNewsList from "../components/LatestNews/LatestNewsList";
import { NEWSARTICLES } from "../data/dummy_data";

const NewsOverview = () => {
  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <LatestNewsList data={NEWSARTICLES} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryButton: {
    marginRight: 16,
    fontSize: 16,
    color: "blue",
  },
});

export default NewsOverview;
