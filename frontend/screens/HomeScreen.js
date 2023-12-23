import React from "react";
import { View, Text, Button } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Logout logic here
    // Navigate back to login screen:
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Welcome to the App!</Text>
      {/* Display user-specific information if needed */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default WelcomeScreen;
