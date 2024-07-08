import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StringAvatar from "../common/UserAvatar";

export default function Account() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [forceReload, setForceReload] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserName = await AsyncStorage.getItem('name');
      if (storedEmail && storedUserId) {
        setLoggedIn(true);
        setUserId(storedUserId);
      }
    };
    checkLoginStatus();
  }, [forceReload]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    //@ts-expect-error
    navigation.navigate("LoginScreen");
    setLoggedIn(false);
  };

  const handleOnNavigate = () => {
    setForceReload(true);
    //@ts-expect-error
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <View style={styles.loggedInContainer}>
          {userId && <StringAvatar userId={userId} name={userName} color= "#404040" size="small"/>}
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleOnNavigate}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  loggedInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#404040",
    padding: 8,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: "#404040",
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
  },
});
