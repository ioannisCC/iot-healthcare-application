import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

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

function ProfileScreen({ navigation }) {
  const [firstname, setFirstname] = useState("John");
  const [lastname, setLastname] = useState("Doe");
  const [email, setEmail] = useState("doctorDoe@hospital.com");
  const [specialization, setSpecialization] = useState("Neurologist");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="light" />

          <View style={styles.profilePic}>
            <Image
              source={require("../assets/doctorProfilePic.png")}
              style={styles.profilePic}
            />
          </View>

          <Text style={styles.title}>Doctor's Profile</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.buttonText}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstname}
              onChangeText={setFirstname}
              keyboardType="default"
            />
            <Text style={styles.buttonText}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastname}
              onChangeText={setLastname}
              keyboardType="default"
            />
            <Text style={styles.buttonText}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.buttonText}>Specialization</Text>
            <SelectList
              setSelected={setSpecialization}
              data={specializations}
              boxStyles={styles.input}
              value={specialization}
              onChangeText={setSpecialization}
              placeholder="Neurologist"
              placeholderTextColor="#FFFFFF"
              dropdownStyles={{
                backgroundColor: "#ffffff",
                minHeight: 300, // Set a maximum height for the dropdown
                width: 350,
                padding: 10,
                color: "#ffffff",
              }}
              inputStyles={{
                color: "#ffffff", // Setting text color of selected item to white
                height: 100,
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login", {})}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222222",
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  title: {
    fontSize: 32,
    color: "#dddddd",
    fontWeight: "bold",
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#000000",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#dddddd",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    marginTop: 25,
    gap: 2,
  },
  input: {
    backgroundColor: "#222222",
    width: 350,
    height: 40,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#555555",
    color: "#ffffff",
    marginBottom: 25,
  },
});

export default ProfileScreen;
