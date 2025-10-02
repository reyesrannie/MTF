import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Card = ({
  module,
  title,
  image = false,
  onPress,
  lesson,
  onPressEdit,
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#15253B",
      borderRadius: 10,
      margin: 10,
    },
    module: {
      color: "#f4ce92",
      fontFamily: "Roboto-Medium",
      fontSize: 20,
    },
    title: {
      color: "#FFFFFF",
      fontFamily: "Roboto-Medium",
      fontSize: 14,
    },
    description: {
      color: "Black",
      fontFamily: "Roboto-Medium",
      fontSize: 12,
    },
    background: {
      borderRadius: 10,
      padding: 10,
      minWidth: 350,
      minHeight: 120,
      maxHeight: 120,
    },
    edit: { position: "absolute", right: 10, top: 10 },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={
            image ? image : require("../../../assets/defaultBackground.jpg")
          }
          style={styles.background}
          blurRadius={5}
          opacity={0.5}
        >
          {module && <Text style={styles.module}>{module}</Text>}
          {lesson && <Text style={styles.module}>{`Lesson ${lesson}`}</Text>}

          <Text style={styles.title}>{title}</Text>
        </ImageBackground>
      </TouchableOpacity>
      {onPressEdit && (
        <TouchableOpacity style={styles.edit} onPress={onPressEdit}>
          <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Card;
