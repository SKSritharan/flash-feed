import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function CategoryFilterButton({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((category, index) => {
          let isActive = category.title === activeCategory;
          let activeButtonStyle = isActive
            ? styles.activeButton
            : styles.inactiveButton;
          let activeTextStyle = isActive
            ? styles.activeText
            : styles.inactiveText;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.title)}
              style={styles.categoryButton}
            >
              <View style={[styles.roundedButton, activeButtonStyle]}>
                <Text style={[styles.categoryText, activeTextStyle]}>
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  scrollViewContent: {
    paddingRight: 20,
  },
  categoryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roundedButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeButton: {
    backgroundColor: "#FF3A44",
  },
  inactiveButton: {
    backgroundColor: "rgba(255, 58, 68, 0.1)",
  },
  categoryText: {
    textTransform: "capitalize",
    fontSize: hp(1.6),
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#525252",
  },
});
