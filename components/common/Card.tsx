import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import StringAvatar from "./UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface CardProps {
  type: "post" | "album" | "photo" | "user";
  id: number;
  userId: string;
  userName: string;
  name: string;
  title?: string;
  description?: string;
  image?: string;
}

function Card({ type, id, title, description, image, userId, userName, name }: CardProps) {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const navigation = useNavigation();

  const onPressDelete = (type, id) => {
    switch (type) {
      case "post":
        deleteBook(id);
        break;
      default:
        console.error("Unknown type:", type);
    }
    setIsHidden(true);
    console.log("Card hidden");
  };

  const deleteBook = async (postId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });
      console.log("post deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        setLoggedInUserId(userId);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchLoggedInUserId();
  }, []);

  const navigateToPostCommentScreen = () => {
    //@ts-expect-error
    navigation.navigate("PostComments", { id });
  };

  const navigateToUserProfile = () => {
    //@ts-expect-error
    navigation.navigate("UserProfile", { userId });
  };

  return (
    <>
      {!isHidden && (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {type !== "photo" && (
              <View style={styles.avatarContainer}>
                <StringAvatar
                  userId={userId}
                  name={userName}
                  color="lightgray"
                  size="small"
                />
              </View>
            )}

            {type !== "user" && (
              <View style={styles.cardContent}>
                <Text style={styles.title}>{title}</Text>
                {description && (
                  <Text style={styles.description}>{description}</Text>
                )}
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
                <Text style={styles.username}>@{userName}</Text>
                <View style={styles.cardActions}>
                  {type === "post" && (
                    <TouchableOpacity onPress={navigateToPostCommentScreen}>
                      <Text style={styles.actionButton}>COMMENTS</Text>
                    </TouchableOpacity>
                  )}
                  {loggedInUserId === userId && (
                    <TouchableOpacity onPress={() => onPressDelete(type, id)}>
                      <Text style={styles.deleteButton}>DELETE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {type === "user" && (
              <View style={styles.cardActions}>
                <Text>{name}</Text>
                <TouchableOpacity onPress={navigateToUserProfile}>
                  <Text style={styles.actionButton}>VIEW PROFILE</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "lightgray",
    borderWidth: 1,
    overflow: "hidden",
    padding: 10,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  cardContent: {
    padding: 5,
  },
  cardActions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    marginTop: 5,
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
  },
  username: {
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 14,
    color: "#888",
    textAlign: "left",
  },
  actionButton: {
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    textAlign: "center",
  },
  deleteButton: {
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
    textAlign: "center",
  },
});

export default Card;
