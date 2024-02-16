import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

var { height, width } = Dimensions.get("window");

export default function NewsSection({ newsProps }) {
  const navigation = useNavigation();
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);

  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  const handleClick = (item) => {
    navigation.navigate("NewsDetail", item);
  };

  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          const isArticleBookmarkedList = urlList.map((url) =>
            savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          );

          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log("Error Loading Saved Articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList])
  );

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        key={index}
        onPress={() => handleClick(item)}
      >
        <ImageBackground
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.authorText}>
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + "..."
                : item.author}
            </Text>

            <Text style={styles.titleText}>
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            <Text style={styles.dateText}>{formatDate(item.publishedAt)}</Text>
          </View>

          <View style={styles.bookmarkContainer}>
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <HeartIcon color={bookmarkStatus[index] ? "red" : "gray"} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  itemContainer: {
    positional: "relative",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  imageBackground: {
    width: width - 32,
    height: hp(30),
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    padding: 12,
  },
  authorText: {
    fontSize: hp(1.5),
    fontWeight: "bold",
    color: "#ffffff",
  },
  titleText: {
    fontSize: hp(1.7),
    textTransform: "capitalize",
    fontFamily: "NunitoBold",
    color: "#ffffff",
  },
  dateText: {
    fontSize: hp(1.5),
    color: "#ffffff",
  },
  bookmarkContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
