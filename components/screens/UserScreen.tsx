import React from "react";
import { useGetUsers } from "../../api/users/useGetUsers";
import { ScrollView, View, ActivityIndicator, StyleSheet, FlatList, } from "react-native";
import Card from "../common/Card";
import UserAccountBar from "../common/UserAccountBar";

export default function Users() {
  const users = useGetUsers();

  if (!users) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Card
      type="user"
      id={item.id}
      userId={item.id.toString()}
      userName={item.username}
      name={item.name}
    >
    </Card>
  );

  return (
    <ScrollView style={{ marginBottom: 15}}>
      <UserAccountBar />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
