import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginVertical: 10,
  },
});

export default Divider;
