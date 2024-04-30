import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { readUser } from "../../utilities/functions/storeData";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}></View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  topNavigation: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
