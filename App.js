import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import NewsOverview from "./screens/NewsOverview";
import NewsDetail from "./screens/NewsDetail";
import NewsSearch from "./screens/NewsSearch";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer
        screenOptions={{
          headerStyle: { backgroundColor: "#351401" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#3f2f25" },
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="NewsOverview" component={NewsOverview} />
          <Stack.Screen name="NewsDetail" component={NewsDetail} />
          <Stack.Screen name="NewsSearch" component={NewsSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
