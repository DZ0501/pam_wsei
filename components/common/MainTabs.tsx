import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostsScreen";
import PostCommentsScreen from "../screens/PostCommentsScreen";
import AlbumsScreen from "../screens/AlbumsScreen";
import AlbumPhotosScreen from "../screens/AlbumPhotosScreen";
import UserScreen from "../screens/UserScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  tabBarStyle: { height: 60, backgroundColor: '#0a0a0a' },
  tabBarActiveTintColor: '#fff',
  tabBarInactiveTintColor: 'lightgray',
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 8,
  },
};

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const PostStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AlbumStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="AlbumsScreen"
        component={AlbumsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlbumPhotos"
        component={AlbumPhotosScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostComments"
        component={PostCommentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      //@ts-expect-error
      screenOptions={{ ...tabBarOptions, headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostStack}
        options={{
          tabBarLabel: "POSTS",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={26} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Albums"
        component={AlbumStack}
        options={{
          tabBarLabel: "ALBUMS",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="image-album" color={color} size={26} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          tabBarLabel: "UserProfile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          unmountOnBlur: true,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="UserStack"
        component={UserStack}
        options={{
          tabBarLabel: "USERS",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
