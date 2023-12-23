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

const PulsePatientHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    padding: 10,
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
  categoryHeaderText: {
    color: "white",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  // footer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   paddingVertical: 10,
  //   borderTopWidth: 1,
  //   borderColor: "#ccc",
  // },
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
  betweenCategories: {
    marginBottom: 150,
  },
});

export default PulsePatientHistoryScreen;
