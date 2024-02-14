import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

var { height, width } = Dimensions.get("window");

const LatestNewsCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title and Author */}
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {item.title.length > 60
                ? item.title.slice(0, 58) + "..."
                : item.title.split("-")[0] || "N/A"}
            </Text>
          </View>

          <View>
            <Text style={styles.author}>
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + "..."
                : item.author}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: 12,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textContainer: {
    position: "absolute",
    bottom: height * 0.06,
    left: width * 0.04,
    justifyContent: "flex-end",
    height: "80%",
  },
  titleContainer: {
    maxWidth: "98%",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  author: {
    color: "#999",
    fontSize: 12,
    fontWeight: "medium",
  },
});

export default LatestNewsCard;
