import React from "react";
import { View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import LatestNewsCard from "./LatestNewsCard";

var { width } = Dimensions.get("window");

export default function LatestNewsList({ data, label }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsDetail", item);
  };

  return (
    <View>
      <Carousal
        data={data}
        renderItem={({ item }) => (
          <LatestNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
