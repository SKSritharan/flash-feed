import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LatestNewsCard = ({ urlToImage, title, description, author }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0, 1]}
        colors={["rgba(98, 98, 98, 0.35)", "#000"]}
        style={styles.gradient}
      >
        <ImageBackground
          resizeMode="cover"
          source={{ uri: urlToImage }}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.author}>by {author}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.2, // for iOS
  },
  gradient: {
    flex: 1,
  },
  imageBackground: {
    height: 200,
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 16,
  },
  author: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionContainer: {
    padding: 16,
  },
  description: {
    color: "white",
  },
});

export default LatestNewsCard;
