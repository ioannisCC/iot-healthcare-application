import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import moment from "moment";

function ListItem({ text, time, date }) {
  return (
    <View style={styles.listItem}>
      <Image
        source={require("../assets/patientPicture.png")}
        style={styles.profilePic}
      />
      <Text style={styles.listItemText}>{text}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.timeText}>{date}</Text>
      </View>
    </View>
  );
}

const SchizophreniaPatientHistoryScreen = (props) => {
  const patientName = props.route.params.patientName;
  const [data, setData] = useState([]);

  useEffect(() => {
    const sendPatientNameToServer = async (patientName) => {
      try {
        const response = await fetch(
          "http://192.168.56.1:3000/schizophreniahistory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ patientName }),
          }
        );

        await response.text(); // Wait for the response
        fetchData(); // Call fetchData after the patient name is sent
      } catch (error) {
        console.error("Error sending patient name:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.56.1:3000/schizophreniahistory?patientName=${encodeURIComponent(
            patientName
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const formattedData = jsonResponse.map((item, index) => ({
          id: item._id.$oid,
          text: `Patient ${item.patient_name} has a probability score of ${item.probability_scores}%`,
          time: moment(item.detection_date.$date).format("HH:mm:ss"),
          date: moment(item.detection_date.$date).format("DD/MM/YYYY"),
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    sendPatientNameToServer(patientName);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryHeaderText}>
        Schizophrenia Patient History
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem text={item.text} time={item.time} date={item.date} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    padding: 10,
  },
  categoryHeaderText: {
    color: "white",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  listItem: {
    backgroundColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  listItemText: {
    color: "#dddddd",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    margin: 10,
  },
  timeContainer: {
    width: 100,
  },
  timeText: {
    color: "#dddddd",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default SchizophreniaPatientHistoryScreen;
