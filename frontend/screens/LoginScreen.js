import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersData = route.params?.usersData || [];

  // const handleLogin = () => {
  //   alert("second" + usersData.password);
  //   const isValidUser = usersData.some(
  //     (usersData) =>
  //       usersData.email === email && usersData.password === password
  //   );

  //   if (isValidUser) {
  //     navigation.navigate("Home");
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // };

  const handleLogin = () => {
    if (email === "admin" && password === "123456") {
      navigation.navigate("Main");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/AppLogo.png")} style={styles.logo} />
        <Text style={styles.logoText}>MediGraph</Text>
      </View>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.registerTextCont}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerButton}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "black",
    fontSize: 20,
    marginTop: 10,
  },
  loginText: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
  },
  input: {
    width: 300,
    backgroundColor: "#dddddd",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "black",
    marginVertical: 10,
    padding: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  registerTextCont: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#000000",
    fontSize: 16,
  },
  registerButton: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LoginScreen;
