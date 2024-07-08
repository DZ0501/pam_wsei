import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import StringAvatar from "./UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface TileProps {
    type: "post" | "album" | "photo" | "user";
    id: number;
    userId: string;
    userName: string;
    name: string;
    title?: string;
    description?: string;
    image?: string;
}

const Tile = ({
    type,
    id,
    title,
    description,
    image,
    userId,
    userName,
    name,
}: TileProps) => {
    const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const navigation = useNavigation();

    const onPressDelete = (type, id) => {
        switch (type) {
            case "post":
                deletePost(id);
                break;
            case "album":
                deleteAlbum(id);
                break;
            case "photo":
                deletePhoto(id);
                break;
            default:
                console.error("Unknown type:", type);
        }
        setIsHidden(true);
        console.log("Tile hidden");
    };

    const deletePost = async (postId) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: "DELETE",
            });
            console.log("post deleted");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    const deleteAlbum = async (albumId) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
                method: "DELETE",
            });
            console.log("album deleted");
        } catch (error) {
            console.error("Error deleting album:", error);
        }
    };

    const deletePhoto = async (photoId) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
                method: "DELETE",
            });
            console.log("photo deleted");
        } catch (error) {
            console.error("Error deleting photo:", error);
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

    const navigateToPostDetails = () => {
        //@ts-expect-error
        navigation.navigate("PostDetails", { id });
    };

    const navigateToAlbumPhotos = () => {
        //@ts-expect-error
        navigation.navigate("AlbumPhotos", { id });
    };

    const navigateToUserProfile = () => {
        //@ts-expect-error
        navigation.navigate("UserProfile", { userId });
    };

    return (
        <>
            {!isHidden && (
                <TouchableOpacity style={styles.tileContainer} onPress={navigateToAlbumPhotos}>
                    <View style={styles.avatarContainer}>
                    </View>
                    <View style={styles.imageContainer}>
                        {image && (
                            <Image source={{ uri: image }} style={styles.image} />
                        )}
                    </View>
                    <View style={styles.tileContent}>
                        <Text style={styles.title}>{title}</Text>
                        {description && (
                            <Text style={styles.description}>{description}</Text>
                        )}
                        {/* <Text style={styles.username}>@{userName}</Text> */}
                        <View style={styles.tileActions}>
                            {type === "post" && (
                                <TouchableOpacity onPress={navigateToPostDetails}>
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
                </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    tileContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        borderWidth: 5, // White border like Instax photo
        borderColor: "#fff",
        elevation: 3, // Add shadow for depth
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    imageContainer: {
        width: Dimensions.get("window").width / 2 - 40, // Adjusted size for smaller tiles
        height: Dimensions.get("window").width / 2 - 60,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    tileContent: {
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
        color: "#333",
        textAlign: "center",
    },
    description: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginHorizontal: 10,
    },
    username: {
        marginTop: 10,
        fontSize: 14,
        color: "#888",
        textAlign: "center",
    },
    tileActions: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
    },
    actionButton: {
        borderRadius: 50,
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
        borderRadius: 50,
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

export default Tile;
