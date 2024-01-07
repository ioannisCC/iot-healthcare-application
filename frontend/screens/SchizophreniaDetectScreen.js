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

const SchizophreniaDetectScreen = (props) => {
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
        const response = await fetch(
          `http://192.168.56.1:3000/members?patientName=${encodeURIComponent(
            patientName
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setData(text);
        console.log(text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    sendPatientNameToServer(patientName);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.categoryHeaderText}>Schizophrenia Detection</Text>
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              The patient is classified as having Schizophrenia.
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              Propability of being healthy:{" "}
              {data !== null ? `${(100 - data).toFixed(3)}%` : "Loading..."}
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              Propability of having Schizophrenia:{" "}
              {data !== null ? `${data}%` : "Loading..."}
            </Text>
          </View>
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
  categoryHeaderText: {
    color: "white",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 18,
    color: "white", // White color for the text
  },
  betweenCategories: {
    marginBottom: 150,
  },
});

export default SchizophreniaDetectScreen;
