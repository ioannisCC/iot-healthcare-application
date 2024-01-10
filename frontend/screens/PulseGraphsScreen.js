import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

const PulseGraphsScreen = (props) => {
  const patientName = props.route.params.patientName; // Extract patientName from route param
  const [currentData, setCurrentData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dataIndex, setDataIndex] = useState(0);

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
      setIsLoading(true);
      try {
        const response = await fetch("http://192.168.56.1:3000/pulsegraph");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        setCurrentData({
          labels: json.t_values.slice(0, 5).map((t) => t.toFixed(2)),
          datasets: [{ data: json.hr_values.slice(0, 5) }],
        });

        setIsLoading(false);

        // Start interval after data is fetched
        const interval = setInterval(() => {
          setDataIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % json.t_values.length;
            setCurrentData({
              labels: json.t_values
                .slice(newIndex, newIndex + 5)
                .map((t) => t.toFixed(2)),
              datasets: [
                { data: json.hr_values.slice(newIndex, newIndex + 5) },
              ],
            });
            return newIndex;
          });
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clear interval on component unmount
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    sendPatientNameToServer(patientName);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Real-Time Heart Rate Monitoring</Text>
      <LineChart
        data={currentData}
        width={400}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default PulseGraphsScreen;
