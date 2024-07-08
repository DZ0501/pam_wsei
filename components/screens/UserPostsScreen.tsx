import React from "react";
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import Card from "../common/Card";
import { useGetUserPosts } from "../../api/users/useGetUserPosts";

function UserPosts({ userId, userName, name }) {
  const posts = useGetUserPosts(userId);

  if (!posts) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <Card
            key={post.id}
            type="post"
            id={post.id}
            title={post.title}
            description={post.body}
            userId={userId}
            userName={userName}
            name={name}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postsContainer: {
    marginBottom:70,
  },
});

export default UserPosts;
