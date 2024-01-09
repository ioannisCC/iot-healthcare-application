import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const PulseGraphsScreen = () => {
  // Updated timeData with floating point numbers
  const timeData = [
    553757.67512, 553910.68198, 554380.69215, 554635.70236, 554832.71458,
    555327.72547, 556163.73582, 556389.74567, 556399.75528, 556403.76493,
    556408.77489, 556410.7845,
  ];
  const pulseData = [93, 92, 88, 94, 90, 98, 61, 59, 57, 56, 56, 57];

  const [dataIndex, setDataIndex] = useState(0);
  const [currentData, setCurrentData] = useState({
    labels: timeData.slice(0, 5).map((t) => t.toFixed(2)), // Updated to format floating point numbers
    datasets: [{ data: pulseData.slice(0, 5) }],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % timeData.length;
        setCurrentData({
          labels: timeData
            .slice(newIndex, newIndex + 5)
            .map((t) => t.toFixed(2)), // Updated here as well
          datasets: [{ data: pulseData.slice(newIndex, newIndex + 5) }],
        });
        return newIndex;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

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
