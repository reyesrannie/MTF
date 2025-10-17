import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CustomDrawerButton = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);

  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      {/* <Image source={{ uri: userData?.profile_photo }} style={styles.image} /> */}
    </TouchableOpacity>
  );
};

export default CustomDrawerButton;

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 15,
  },
});
