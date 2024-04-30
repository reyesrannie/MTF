import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import AppTextBox from "../../../components/customs/AppTextBox";

const StudentLogin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Code</Text>
      <Image
        source={require("../../../../assets/secure-shield.png")}
        style={styles.image}
      />
      <Text style={styles.textEnter}>Enter Sercurity Password</Text>
      <Text style={styles.textDesc}>
        The password was sent to you by your Instructor if you dont have
        password please contact your Instructor
      </Text>

      {/* <AppTextBox /> */}
    </View>
  );
};

export default StudentLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "#493d8a",
    margin: 10,
    marginVertical: 20,
  },
  textEnter: {
    fontSize: 25,
    fontFamily: "Roboto-Black",
    color: "#493d8a",
    marginTop: 40,
    marginBottom: 0,
  },
  textDesc: {
    fontSize: 16,
    fontFamily: "Roboto-Light",
    color: "#493d8a",
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    height: 100,
    width: 100,
  },
});
