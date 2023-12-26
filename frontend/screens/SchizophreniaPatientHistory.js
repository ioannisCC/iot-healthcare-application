import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

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

const SchizophreniaPatientHistoryScreen = () => {
  const [data, setData] = useState([
    {
      id: "1",
      text: "James has been detected with Schizophrenia.",
      time: "22:13",
      date: "18/03/2022",
    },
    {
      id: "2",
      text: "James has been detected with Schizophrenia.",
      time: "09:45",
      date: "19/03/2022",
    },
  ]);

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
