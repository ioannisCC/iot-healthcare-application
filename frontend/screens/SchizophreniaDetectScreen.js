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

const SchizophreniaDetectScreen = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.56.1:3000/members");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text(); // Use .text() instead of .json()
        setData(text);
        console.log(text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
              Propability of being healthy: {100 - data}%
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              Propability of having Schizophrenia: {data}%
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
