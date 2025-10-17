import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚧 Coming Soon 🚧</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
});

export default ComingSoon;
