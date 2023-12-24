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

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MediGraph</Text>
        <TextInput style={styles.searchInput} placeholder="Search patients" />
      </View>
      <ScrollView>
        <View>
          <Text style={styles.categoryHeaderText}>Real Time Graphs</Text>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate("BrainwavesGraphs")}
          >
            <Ionicons name="ios-pulse" size={24} color="white" />
            <Text style={styles.categoryButtonText}>Brainwaves Graphs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate("PulseGraphs")}
          >
            <Ionicons name="ios-pulse" size={24} color="white" />
            <Text style={styles.categoryButtonText}>Pulse Graphs</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.categoryHeaderText}>Schizophrenia</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("SchizophreniaMedication")}
          >
            <FontAwesome5 name="pills" size={24} color="white" />
            <Text style={styles.categoryButtonText2}>
              Medication Suggestion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("SchizophreniaDetect")}
          >
            <MaterialCommunityIcons
              name="stethoscope"
              size={24}
              color="white"
            />
            <Text style={styles.categoryButtonText2}>Detect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("SchizophreniaPatientHistory")}
          >
            <FontAwesome name="history" size={24} color="white" />
            <Text style={styles.categoryButtonText2}>Patient History</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.categoryHeaderText}>Epilepsy</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("EpilepsyMedication")}
          >
            <FontAwesome5 name="pills" size={24} color="white" />
            <Text style={styles.categoryButtonText2}>
              Medication Suggestion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("EpilepsyDetect")}
          >
            <MaterialCommunityIcons
              name="stethoscope"
              size={24}
              color="white"
            />
            <Text style={styles.categoryButtonText2}>Detect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("EpilepsyPatientHistory")}
          >
            <FontAwesome name="history" size={24} color="white" />
            <Text style={styles.categoryButtonText2}>Patient History</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.categoryHeaderText}>Pulse</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("PulsePatientHistory")}
          >
            <FontAwesome name="history" size={24} color="white" />
            <Text style={styles.categoryButtonText2}>Patient History</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* <View style={styles.footer}>
        <Ionicons name="ios-home" size={24} color="gray" />
        <FontAwesome5 name="save" size={20} color="gray" />
        <Ionicons name="ios-person" size={24} color="gray" />
      </View> */}
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

  categoryButton2: {
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    width: 110, // Adjust the width as needed
    height: 90, // Adjust the height as needed
    backgroundColor: "gray", // #333
    borderRadius: 10,
    marginRight: 20, // Space between buttons
  },
  categoryButtonText2: {
    color: "white",
    marginTop: 5,
  },
  betweenCategories: {
    marginBottom: 150,
  },
});

export default HomeScreen;
