import { View, StyleSheet, Text, ScrollView } from "react-native";
import LatestNewsCard from "../components/UI/LatestNewsCard";
import { NEWSARTICLES } from "../data/dummy_data";

const NewsOverview = () => {
  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        >
          {NEWSARTICLES.map((news, index) => (
            <LatestNewsCard key={index} {...news} />
          ))}
        </ScrollView>
      </View>

      {/* <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoryNews.map((category, index) => (
            <Text key={index} style={styles.categoryButton}>
              {category.category}
            </Text>
          ))}
        </ScrollView>
      </View>

      {categoryNews.map((category, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{category.category} News</Text>
          <ScrollView>
            {category.news.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </ScrollView>
        </View>
      ))} */}
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
