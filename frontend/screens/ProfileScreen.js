import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";

data = [
  {
    id: 1,
    name: "Mom",
  },
  {
    id: 2,
    name: "Friend",
  },
  {
    id: 3,
    name: "Friend2",
  },
];

function EmergencyContact({ name, id }) {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#555555",
        alignItems: "center",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: "#000000",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#dddddd", fontSize: 22 }}>{id}</Text>
      </View>
      <Text style={{ paddingHorizontal: 15, fontSize: 18, color: "#dddddd" }}>
        {name}
      </Text>
    </View>
  );
}

function ProfileScreen(props) {
  const [bloodType, setBloodType] = useState("O");
  const [weight, setWeight] = useState("78");
  const [height, setHeight] = useState("182");
  const [allergies, setAllergies] = useState("Shellfish,");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.profilePic}></View>

        <Text style={styles.title}>Patient Profile</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Age</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gender</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.buttonText}>Blood Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Blood type"
            value={bloodType}
            onChangeText={setBloodType}
            keyboardType="default"
          />
          <Text style={styles.buttonText}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="number-pad"
          />
          <Text style={styles.buttonText}>Height</Text>
          <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
            keyboardType="number-pad"
          />
          <Text style={styles.buttonText}>Allergies</Text>
          <TextInput
            style={styles.input}
            placeholder="Allergies"
            value={allergies}
            onChangeText={setAllergies}
            keyboardType="default"
          />
        </View>

        <View style={styles.contactsContainer}>
          <ScrollView horizontal={true}>
            {data.map((e) => (
              <EmergencyContact key={e.id.toString()} name={e.name} id={e.id} />
            ))}
          </ScrollView>
        </View>
      </View>
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
    backgroundColor: "#f27c22",
    padding: 50,
    borderRadius: 5,
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
    color: "#dddddd",
    marginBottom: 25,
  },
  contactsContainer: {
    height: 100,
  },
});

export default ProfileScreen;

// import React from "react";
// import { View, Text, Image, StyleSheet, TextInput } from "react-native";

// const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../assets/AppLogo.png")}
//         style={styles.profileImage}
//       />
//       <Text style={styles.profileTitle}>Doctor's Profile</Text>
//       <View style={styles.inputGroup}>
//         <TextInput style={styles.input} placeholder="Age" />
//         <TextInput style={styles.input} placeholder="Gender" />
//       </View>
//       <Text style={styles.label}>Blood Type</Text>
//       <Text style={styles.value}>O</Text>
//       <Text style={styles.label}>Weight</Text>
//       <Text style={styles.value}>78</Text>
//       <Text style={styles.label}>Height</Text>
//       <Text style={styles.value}>182</Text>
//       <Text style={styles.label}>Allergies</Text>
//       <Text style={styles.value}>Shellfish,</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   profileImage: {
//     width: 100, // Set the width as needed
//     height: 100, // Set the height as needed
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   profileTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   inputGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "black",
//     padding: 10,
//     flex: 1,
//     marginRight: 10,
//   },
//   label: {
//     fontSize: 16,
//     color: "black",
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 16,
//     color: "gray",
//     marginBottom: 15,
//   },
// });

// export default ProfileScreen;
