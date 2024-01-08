import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const PulseGraphsScreen = () => {
  const rawData = `553757,93
  553910,92
  554380,88
  554635,94
  554832,90
  555327,98
  556163,61
  556389,59
  556399,57
  556403,56
  556408,56
  556410,57
   `;

  // Parse the raw data string
  const parsedData = rawData
    .trim()
    .split("\n")
    .map((line) => {
      const [time, heartRate] = line.trim().split(",");
      return { Time: parseInt(time), HeartRate: parseInt(heartRate, 10) };
    });

  //Minimum time value
  const minTime = Math.min(...parsedData.map((d) => d.Time));

  //Normalize the time values, because numbers are too large
  const normalizedData = parsedData.map((d) => ({
    Time: d.Time - minTime, // Subtract minTime from each time value
    HeartRate: d.HeartRate,
  }));

  const [currentData, setCurrentData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = (Date.now() - startTime) / 1000; // Convert to seconds
      const new_data = normalizedData
        .filter((d) => d.Time <= currentTime)
        .slice(-5); // Get last 100 data points

      const labels = new_data.map((d) => d.Time.toFixed(2));
      const heartRates = new_data.map((d) => d.HeartRate);

      setCurrentData({
        labels: labels,
        datasets: [{ data: heartRates }],
      });
    }, 100); // Update every 0.1 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [startTime, normalizedData]); // Include normalizedData in the dependency array

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
