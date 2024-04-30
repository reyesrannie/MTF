import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const AppButton = ({
  name,
  color,
  width,
  height,
  bgColor,
  borderRadius,
  onPress,
  icon,
  iconColor,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: icon ? "flex-start" : "center",
      backgroundColor: bgColor,
      width: width,
      height: height,
      borderRadius: borderRadius,
      margin: 5,
    },
    text: {
      fontFamily: "Roboto-Medium",
      letterSpacing: 1,
      color: color,
    },
    button: {
      backgroundColor: bgColor,
    },
    icon: {
      marginHorizontal: 30,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon && (
          <FontAwesome
            name={icon}
            size={24}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
