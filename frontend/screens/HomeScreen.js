import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"; // Make sure to install expo vector icons package

const HomeScreen = () => {
  const handleBrainwavesGraphs = (category) => {
    console.log(`Pressed ${category}`);
    alert("Brainwaves Graphs pressed");
    // You can add navigation logic here
  };
  const handlePulseGraphs = (category) => {
    console.log(`Pressed ${category}`);
    alert("Pulse Graphs pressed");
    // You can add navigation logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MediGraph</Text>
        <TextInput style={styles.searchInput} placeholder="Search patients" />
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.categoryHeaderText}>Real Time Graphs</Text>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleBrainwavesGraphs("Brainwaves Graphs")}
        >
          <Ionicons name="ios-pulse" size={24} color="white" />
          <Text style={styles.categoryButtonText}>Brainwaves Graphs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handlePulseGraphs("Brainwaves Graphs")}
        >
          <Ionicons name="ios-pulse" size={24} color="white" />
          <Text style={styles.categoryButtonText}>Pulse Graphs</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.categoryHeaderText}>Schizophrenia</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => handlePress("Medication Proposal")}
        >
          <FontAwesome5 name="pills" size={24} color="white" />
          <Text style={styles.buttonText2}>Medication Proposal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => handlePress("Detect")}
        >
          <MaterialCommunityIcons name="stethoscope" size={24} color="white" />
          <Text style={styles.buttonText2}>Detect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle2}
          onPress={() => handlePress("Patient History")}
        >
          <FontAwesome name="history" size={24} color="white" />
          <Text style={styles.buttonText2}>Patient History</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="ios-home" size={24} color="gray" />
        <FontAwesome5 name="save" size={20} color="gray" />
        <Ionicons name="ios-person" size={24} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#262626",
  },
  headerText: {
    color: "green",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
  },
  searchInput: {
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  contentContainer: {
    padding: 10,
  },
  categoryHeaderText: {
    color: "white",
    fontSize: 20,
    paddingBottom: 10,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "white", // White color for the text
  },

  categoryContainer2: {
    // Container for the category and buttons
    backgroundColor: "black",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  scrollViewContainer2: {
    // Styles for the ScrollView content
    paddingRight: 10,
  },
  buttonStyle2: {
    // Button styles
    alignItems: "center",
    justifyContent: "center",
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    backgroundColor: "#333", // A darker background for the button
    borderRadius: 10,
    marginRight: 10, // Space between buttons
  },
  buttonText2: {
    // Text inside the button
    color: "white",
    marginTop: 5,
  },
});

export default HomeScreen;
