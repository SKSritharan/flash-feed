import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";

import NewsOverview from "../screens/NewsOverview";
import NewsDetail from "../screens/NewsDetail";
import FavouritesScreen from "../screens/FavouritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreens from "../screens/SplashScreens";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AuthContextProvider, { AuthContext } from "../store/auth-context";

const android = Platform.OS === "android";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTabs"
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          authCtx.authenticate(token);
        }
      } catch (error) {
        // Handle AsyncStorage error
        console.error("Error fetching token from AsyncStorage:", error);
      } finally {
        setIsTryingLogin(false);
      }
    }

    fetchToken();
  }, [authCtx]);

  if (isTryingLogin) {
    return (
      <NavigationContainer>
        <SplashScreens />
      </NavigationContainer>
    );
  }

  return <Navigation />;
}

const TabNavigator = () => {
  const authCtx = useContext(AuthContext);
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Favourites") {
            iconName = "heart-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          const customizeSize = 25;

          return (
            <Ionicons
              name={iconName}
              size={customizeSize}
              color={focused ? "red" : "gray"}
            />
          );
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "NunitoRegular",
        },
        tabBarStyle: {
          backgroundColor: colorScheme == "dark" ? "black" : "white",
        },
      })}
    >
      <Tab.Screen name="Home" component={NewsOverview} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isLoggedIn ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function AppNavigation() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
