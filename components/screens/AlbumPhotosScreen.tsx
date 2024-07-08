import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useGetPhotosByAlbumId } from "../../api/photos/useGetPhotosByAlbumId";
import { useGetUser } from "../../api/users/useGetUser";
import { useGetAlbumById } from "../../api/albums/useGetAlbumById";
import Card from "../common/Card";
import { FlatList } from "react-native-gesture-handler";

export default function AlbumPhotosScreen({ route }) {
  const { id } = route.params;
  const photos = useGetPhotosByAlbumId(id || "");
  const albumId = photos && photos.length > 0 ? photos[0].albumId : null;
  const album = useGetAlbumById(albumId ? String(albumId) : "");
  const userId = album ? album.userId : null;
  const user = useGetUser(userId ? String(userId) : "");

  function viewResult(){
    console.log(id, albumId)
  }

  if (!photos) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="secondary" />
      </View>
    );
  }

  const renderPhotoItem = ({ item }) => (
    <Card
      type="photo"
      id={item.id}
      title={item.title}
      userId={album?.userId?.toString() || ""}
      name={user?.name || ""}
      userName={user?.username || ""}
      description=""
      image={item.url}
    />
  );

  if (photos.length > 0) {
    return (
      <View>
        <View style={{marginBottom:15}}>

        <FlatList
          data={photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item) => item.id.toString()}
        />
        </View>
      </View>
    );
  } else {
    viewResult();
    return (
      <View>
        <Text>This album does not contain any photos yet </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
