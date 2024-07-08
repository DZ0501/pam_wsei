import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUsers } from "../../api/users/useGetUsers";

export default function LoginScreen({ navigation }) {
  const users = useGetUsers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    const currentUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (currentUser) {
      AsyncStorage.setItem("userId", currentUser.id.toString());
      AsyncStorage.setItem("name", currentUser.name);
      AsyncStorage.setItem("email", currentUser.email.toLowerCase());
      navigation.navigate("Home");
    } else {
      setLoginError(true);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          {loginError && (
            <Text style={styles.error}>Invalid email or password</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: '90%',
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0a0a0a",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
