import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Authentication logic here
    // On successful authentication:
    if (username === "admin" && password === "123456") {
      navigation.navigate("Home");
    } else {
      // Handle the error case (e.g., show an alert or set an error state)
      alert("Invalid username or password");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {/* Optional: Forgot Password and Sign Up links */}
    </View>
  );
};

export default LoginScreen;
