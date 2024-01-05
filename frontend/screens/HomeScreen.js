import React, { useState } from "react";
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
import storage from "@react-native-firebase/storage";
import firebase from "firebase/app";
import "firebase/storage";

const HomeScreen = ({ navigation }) => {
  const patients = [
    { name: "Leanne Graham", id: "1" },
    { name: "Ervin Howell", id: "2" },
    { name: "George Smith", id: "3" },
  ];

  // State for search input and filtered patients
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text) {
      setFilteredPatients([]);
    } else {
      setFilteredPatients(
        patients.filter((patient) =>
          patient.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  // const selectPatient = (patient) => {
  //   setSearchQuery(patient.name);
  //   setActivePatient(patient);
  //   setFilteredPatients([]);
  // };

  const renderPatientList = () => {
    return filteredPatients.map((patient) => (
      <TouchableOpacity
        key={patient.id}
        style={styles.patientItem}
        // Handle patient selection
        // For example, navigate to patient's details
        onPress={() => selectPatient(patient)}
      >
        <Text style={styles.patientName}>{patient.name}</Text>
      </TouchableOpacity>
    ));
  };

  const selectPatient = async (patient) => {
    setSearchQuery(patient.name);
    setActivePatient(patient);
    setFilteredPatients([]);

    // Reference to the user's folder in Firebase Storage
    const userFolderRef = storage().ref(`/${patient.name}`);

    try {
      // List all items in the user's folder
      const listResult = await userFolderRef.listAll();

      // Assuming there's only one file per user and it's the first item
      const fileRef = listResult.items[0];

      // Get the download URL
      const url = await fileRef.getDownloadURL();
      console.log("File URL:", url);

      // Navigate to a screen and pass the file URL if needed
      // navigation.navigate('SomeScreen', { fileUrl: url });
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MediGraph</Text>
        {/* <TextInput style={styles.searchInput} placeholder="Search patients" /> */}
        <View style={styles.searchSection}>
          <Ionicons name="ios-search" size={20} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients"
            value={searchQuery}
            onChangeText={handleSearch}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.patientListContainer}>{renderPatientList()}</View>
      </View>
      <ScrollView>
        <View>
          {activePatient && (
            <Text style={styles.categoryHeaderText}>Real Time Graphs</Text>
          )}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={[
              styles.categoryButton,
              activePatient ? {} : styles.disabledButton,
            ]}
            onPress={() => {
              if (activePatient) {
                navigation.navigate("BrainwavesGraphs", {
                  patientId: activePatient.id,
                });
              }
            }}
            disabled={!activePatient}
          >
            <Ionicons
              name="ios-pulse"
              size={24}
              color={activePatient ? "white" : "grey"}
            />
            <Text style={styles.categoryButtonText}>Brainwaves Graphs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              activePatient ? {} : styles.disabledButton,
            ]}
            onPress={() => {
              if (activePatient) {
                navigation.navigate("PulseGraphs", {
                  patientId: activePatient.id,
                });
              }
            }}
            disabled={!activePatient}
          >
            <Ionicons
              name="ios-pulse"
              size={24}
              color={activePatient ? "white" : "grey"}
            />
            <Text style={styles.categoryButtonText}>Pulse Graphs</Text>
          </TouchableOpacity> */}

          {activePatient && (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() =>
                navigation.navigate("BrainwavesGraphs", {
                  patientId: activePatient.id,
                })
              }
            >
              <Ionicons name="ios-pulse" size={24} color="white" />
              <Text style={styles.categoryButtonText}>Brainwaves Graphs</Text>
            </TouchableOpacity>
          )}

          {activePatient && (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() =>
                navigation.navigate("PulseGraphs", {
                  patientId: activePatient.id,
                })
              }
            >
              <Ionicons name="ios-pulse" size={24} color="white" />
              <Text style={styles.categoryButtonText}>Pulse Graphs</Text>
            </TouchableOpacity>
          )}
        </View>
        {activePatient && (
          <Text style={styles.categoryHeaderText}>Schizophrenia</Text>
        )}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {activePatient && (
            <TouchableOpacity
              style={styles.categoryButton2}
              onPress={() => navigation.navigate("SchizophreniaMedication")}
            >
              <FontAwesome5 name="pills" size={24} color="white" />
              <Text style={styles.categoryButtonText2}>
                Medication Suggestion
              </Text>
            </TouchableOpacity>
          )}
          {activePatient && (
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
          )}
          {activePatient && (
            <TouchableOpacity
              style={styles.categoryButton2}
              onPress={() => navigation.navigate("SchizophreniaPatientHistory")}
            >
              <FontAwesome name="history" size={24} color="white" />
              <Text style={styles.categoryButtonText2}>Patient History</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        {activePatient && (
          <Text style={styles.categoryHeaderText}>Epilepsy</Text>
        )}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {activePatient && (
            <TouchableOpacity
              style={styles.categoryButton2}
              onPress={() => navigation.navigate("EpilepsyMedication")}
            >
              <FontAwesome5 name="pills" size={24} color="white" />
              <Text style={styles.categoryButtonText2}>
                Medication Suggestion
              </Text>
            </TouchableOpacity>
          )}
          {activePatient && (
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
          )}
          {activePatient && (
            <TouchableOpacity
              style={styles.categoryButton2}
              onPress={() => navigation.navigate("EpilepsyPatientHistory")}
            >
              <FontAwesome name="history" size={24} color="white" />
              <Text style={styles.categoryButtonText2}>Patient History</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* <Text style={styles.categoryHeaderText}>Pulse</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.categoryButton2}
            onPress={() => navigation.navigate("PulsePatientHistory")}
          >
            <FontAwesome name="history" size={24} color="white" />
            <Text style={styles.categoryButtonText2}>Patient History</Text>
          </TouchableOpacity>
        </ScrollView> */}
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
    color: "white",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
  },
  patientName: {
    color: "white",
    padding: 10,
  },
  // searchInput: {
  //   height: 40,
  //   marginHorizontal: 10,
  //   padding: 10,
  //   backgroundColor: "#fff",
  //   borderRadius: 20,
  // },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "#424242",
  },
  patientListContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
    maxHeight: 200, // Adjust the max height as needed
  },
  patientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  patientName: {
    fontSize: 16,
    color: "#000",
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
