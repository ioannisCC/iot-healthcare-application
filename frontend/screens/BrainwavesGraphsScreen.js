import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BrainwavesGraphsScreen = (props) => {
  const [data, setData] = useState(null);

  const patientName = props.route.params.patientName; // Extract patientName from route params

  useEffect(() => {
    const sendPatientNameToServer = async (patientName) => {
      try {
        const response = await fetch("http://192.168.56.1:3000/patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientName }),
        });

        await response.text(); // Wait for the response
        fetchData(); // Call fetchData after the patient name is sent
      } catch (error) {
        console.error("Error sending patient name:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.56.1:3000/brainwavegraph");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setData(base64data);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    sendPatientNameToServer(patientName);
  }, []);
  return (
    <View style={styles.container}>
      {/* Other components */}
      {data && (
        <Image
          source={{ uri: data }}
          style={{
            width: "100%",
            height: "100%",
            transform: [{ rotate: "90deg" }, { scale: 2 }], // Flip horizontally
          }}
          resizeMode="contain" // Or 'cover', depending on your needs
        />
      )}
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

export default BrainwavesGraphsScreen;
