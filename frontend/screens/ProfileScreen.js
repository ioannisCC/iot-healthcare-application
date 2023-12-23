import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/AppLogo.png")}
        style={styles.profileImage}
      />
      <Text style={styles.profileTitle}>Patient Profile</Text>
      <View style={styles.inputGroup}>
        <TextInput style={styles.input} placeholder="Age" />
        <TextInput style={styles.input} placeholder="Gender" />
      </View>
      <Text style={styles.label}>Blood Type</Text>
      <Text style={styles.value}>O</Text>
      <Text style={styles.label}>Weight</Text>
      <Text style={styles.value}>78</Text>
      <Text style={styles.label}>Height</Text>
      <Text style={styles.value}>182</Text>
      <Text style={styles.label}>Allergies</Text>
      <Text style={styles.value}>Shellfish,</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileImage: {
    width: 100, // Set the width as needed
    height: 100, // Set the height as needed
    alignSelf: "center",
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
  },
});

export default ProfileScreen;
