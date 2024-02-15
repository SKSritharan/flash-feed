import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useCallback } from "react";
// import { FadeInDown } from "react-native-reanimated";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
    SpaceGroteskBold: require("../assets/fonts/Nunito-Bold.ttf"),
    SpaceGroteskMedium: require("../assets/fonts/Nunito-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate("HomeTabs");
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255, 58, 68, 0.95)", "rgba(255, 58, 68, 0.95)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        onLayout={onLayoutRootView}
        className=" "
        // entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        <Text className="text-white text-3xl font-extrabold uppercase">
          Flash Feed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
