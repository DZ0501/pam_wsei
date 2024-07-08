import React from "react";
import { ScrollView, ActivityIndicator, View, FlatList, StyleSheet } from "react-native";
import { useGetAlbums } from "../../api/albums/useGetAlbums";
import { useGetUsers } from "../../api/users/useGetUsers";
import Tile from "../common/Tile";

export default function Albums() {
  const albums = useGetAlbums();
  const users = useGetUsers();

  if (!albums || !users) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const renderTile = ({ item }) => {
    const user = users.find((user) => user.id === item.userId);
    if (!user) {
      return null;
    }

    return (
      <Tile
        id={item.id}
        title={item.title}
        description={`by @${user.username}`}
        image={`https://via.placeholder.com/150?text=Album+${item.id}`}
        userId={item.userId.toString()}
        userName={user.username}
        name={user.name}
        type="album"
      />
    );
  };

  return (
    <ScrollView style={{ marginBottom: 15, marginTop: 10 }}>
      <View style={styles.container}>
        <FlatList
          data={albums}
          renderItem={renderTile}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
});
