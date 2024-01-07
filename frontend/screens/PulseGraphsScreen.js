import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const PulseGraphsScreen = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const rawData = `556410.36066,57
556408.36062,56
556403.36062,56
556399.36062,57
556389.36062,59
556163.88076,61
555327.00627,98
554832.63128,90
554635.13174,94
554380.11611,88
553910.25704,92
553757.241,93`;

    const parsedData = rawData
      .trim()
      .split("\n")
      .map((line) => {
        const [time, heartRate] = line.trim().split(",");
        return { time: parseFloat(time), heartRate: parseInt(heartRate, 10) };
      });

    const labels = parsedData.map((d) => d.time.toFixed(2));
    const heartRates = parsedData.map((d) => d.heartRate);

    setData({
      labels: labels,
      datasets: [{ data: heartRates }],
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Real-Time Heart Rate Monitoring</Text>
      <LineChart
        data={data} // Use the updated state here
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
