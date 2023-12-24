import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

data = [
  {
    id: "1",
    text: "Mary has 118 pulse.",
    time: "22:13",
    date: "18/03/2022",
  },
  {
    id: "2",
    text: "Mary has 98 pulse.",
    time: "09:45",
    date: "19/03/2022",
  },
];

function ListItem({ text, time, date }) {
  return (
    <View
      style={{
        backgroundColor: "gray",
        flex: 1,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/patientPicture.png")}
        style={styles.profilePic}
      />
      <Text
        style={{
          color: "#dddddd",
          fontSize: 18,
          fontWeight: "bold",
          width: 200,
          margin: 10,
        }}
      >
        {text}
      </Text>

      <View style={{ width: 100 }}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.timeText}>{date}</Text>
      </View>
    </View>
  );
}

const PulsePatientHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.categoryHeaderText}>Epilepsy Patient History</Text>
        <FlatList
          data={data}
          keyExtractor={(dataList) => dataList.id}
          renderItem={({ item }) => (
            <ListItem text={item.text} time={item.time} date={item.date} />
          )}
        />
      </View>
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
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  timeText: {
    color: "#dddddd",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default PulsePatientHistoryScreen;
