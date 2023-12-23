import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import BrainwavesGraphsScreen from "./screens/BrainwavesGraphsScreen";
import PulseGraphsScreen from "./screens/PulseGraphsScreen";
import SchizophreniaDetectScreen from "./screens/SchizophreniaDetectScreen";
import SchizophreniaMedicationScreen from "./screens/SchizophreniaMedicationScreen";
import SchizophreniaPatientHistoryScreen from "./screens/SchizophreniaPatientHistory";
import EpilepsyDetectScreen from "./screens/EpilepsyDetectScreen";
import EpilepsyMedicationScreen from "./screens/EpilepsyMedicationScreen";
import EpilepsyPatientHistoryScreen from "./screens/EpilepsyPatientHistoryScreen";
import PulsePatientHistoryScreen from "./screens/PulsePatientHistory";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "black", // Tab bar background color set to black
          borderTopColor: "transparent", // Optional: remove the border on top of the tab bar
        },
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen
          name="SchizophreniaDetect"
          component={SchizophreniaDetectScreen}
        />
        <Stack.Screen
          name="BrainwavesGraphs"
          component={BrainwavesGraphsScreen}
        />
        <Stack.Screen name="PulseGraphs" component={PulseGraphsScreen} />
        <Stack.Screen
          name="SchizophreniaMedication"
          component={SchizophreniaMedicationScreen}
        />
        <Stack.Screen
          name="SchizophreniaPatientHistory"
          component={SchizophreniaPatientHistoryScreen}
        />
        <Stack.Screen name="EpilepsyDetect" component={EpilepsyDetectScreen} />
        <Stack.Screen
          name="EpilepsyMedication"
          component={EpilepsyMedicationScreen}
        />
        <Stack.Screen
          name="EpilepsyPatientHistory"
          component={EpilepsyPatientHistoryScreen}
        />
        <Stack.Screen
          name="PulsePatientHistory"
          component={PulsePatientHistoryScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        {/* HomeTabs is now a screen that contains the bottom tabs */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
