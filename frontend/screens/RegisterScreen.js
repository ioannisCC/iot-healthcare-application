import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [specialization, setSpecialization] = useState("");

  const usersData = [];

  const handleRegister = () => {
    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      password === password2 &&
      specialization !== ""
    ) {
      const userExists = usersData.some((user) => user.email === email);

      if (userExists) {
        alert("User already exists with that email.");
      } else {
        usersData.push({ name, email, password, specialization });
        alert("Registration successful!");
        alert(email + password + specialization);
        navigation.navigate("Login", { usersData });
      }
    } else {
      if (password !== password2) {
        alert("Passwords do not match.");
      } else if (specialization === "") {
        alert("Please select a specialization.");
      } else {
        alert("Please fill in all fields.");
      }
    }
  };

  const specializations = [
    { key: "neurologist", value: "Neurologist" },
    { key: "neurosurgeon", value: "Neurosurgeon" },
    { key: "psychiatrist", value: "Psychiatrist" },
    { key: "neuropsychologist", value: "Neuropsychologist" },
    { key: "epileptologist", value: "Epileptologist" },
    { key: "sleep_specialist", value: "Sleep Specialist" },
    { key: "clinical_neurophysiologist", value: "Clinical Neurophysiologist" },
    { key: "nurse", value: "Nurse" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.logoText}>MediGraph</Text>
      </View>
      <Text style={styles.RegisterText}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        keyboardType="default"
      />
      <SelectList
        setSelected={setSpecialization}
        data={specializations}
        boxStyles={styles.input}
        placeholder={"Select a specialization"}
        value={specialization}
        onChangeText={setSpecialization}
        dropdownStyles={{
          ...styles.input,
          backgroundColor: "#ffffff",
          color: "#000",
        }}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Re-enter your password"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <View style={styles.registerTextCont}>
        <Text style={styles.registerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerButton}> Log in</Text>
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
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
  },
  logoText: {
    color: "black",
    fontSize: 20,
    marginTop: 10,
  },
  RegisterText: {
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
    color: "#ffffff",
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
  inputDropdown: {
    width: 300,
    backgroundColor: "#dddddd",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    padding: 10,
  },
});

export default RegisterScreen;
