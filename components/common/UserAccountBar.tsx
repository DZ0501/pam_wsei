import React from "react";
import { View, StyleSheet } from "react-native";
import Account from "../screens/AccountScreen";

const UserAccountBar = () => {
  return (
    <View style={styles.navbar}>
      <Account />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderStyle: "solid",
    backgroundColor: "darkgray", 
    borderWidth: 1, 
    borderColor: "gray", 
    marginTop: 15, 
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default UserAccountBar;
