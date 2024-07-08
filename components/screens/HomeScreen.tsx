import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  const navigateToFullscreen = (image) => {
    //@ts-expect-error
    navigation.navigate("Fullscreen", { image });
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        setIsLoggedIn(!!userId);
      } catch (error) {
        console.error("Error checking user login status:", error);
      }
    };

    const fetchImages = async () => {
      try {
        const imageUrls = await Promise.all([
          fetch("https://images.pexels.com/photos/25811340/pexels-photo-25811340/free-photo-of-jedzenie-zywnosc-jasny-lekki.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load").then(res => res.url),
          fetch("https://images.pexels.com/photos/26546540/pexels-photo-26546540/free-photo-of-drewno-jasny-lekki-kawa.jpeg?auto=compress&cs=tinysrgb&w=600").then(res => res.url),
          fetch("https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=600").then(res => res.url),
        ]);
        setImages(shuffleArray(imageUrls));
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Slopound!</Text>
        <Text style={styles.welcomeDescription}>
          Slopound is your go-to app for capturing and sharing life's most exciting moments with friends and followers. Whether you're an adventurer, a foodie, or just someone who loves to stay connected, Slopound offers you a vibrant platform to express yourself through stunning photos and engaging stories. Login and hop on!
        </Text>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.featureImage}
        />
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={{ marginBottom: 15 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Slopound</Text>
        </View>

        <View style={styles.feedContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.feedWrapper}>
              <TouchableOpacity onPress={() => navigateToFullscreen(image)}>
                <Image source={{ uri: image }} style={styles.feedImage} />
              </TouchableOpacity>
              <View style={styles.feedTextContainer}>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const Fullscreen = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.fullscreenContainer}>
      <Image source={{ uri: image }} style={styles.fullscreenImage} />
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Fullscreen" component={Fullscreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  welcomeDescription: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 16, 
  },
  header: {
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  storyContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  storyWrapper: {
    marginRight: 10,
    alignItems: "center",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  feedContainer: {
    padding: 16,
  },
  feedWrapper: {
    marginBottom: 20,
  },
  feedImage: {
    width: Dimensions.get("window").width - 32,
    height: 300,
    borderRadius: 10,
  },
  feedTextContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  feedText: {
    fontSize: 16,
    color: "#333",
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  featureImage: {
    width: Dimensions.get("window").width - 32,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
});
