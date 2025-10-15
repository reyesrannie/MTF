import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loading = ({ open }) => {
  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.container}>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../../../../assets/loading.json")}
          loop={open}
        />
        <Text style={styles.loadingText}>LOADING....</Text>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  loadingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
