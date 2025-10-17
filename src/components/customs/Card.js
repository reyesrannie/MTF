import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Svg, { Circle } from "react-native-svg";

const Card = ({
  module,
  title,
  disabled,
  onPress,
  lesson,
  onPressEdit,
  percentage = 0,
}) => {
  const radius = 22;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      marginVertical: 8,
      marginHorizontal: 12,
      overflow: "hidden",
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      elevation: 4,
      minWidth: "95%",
    },
    module: {
      color: "#f4ce92",
      fontFamily: "Roboto-Medium",
      fontSize: 18,
    },
    title: {
      color: "#FFFFFF",
      fontFamily: "Roboto-Medium",
      fontSize: 14,
    },
    background: {
      borderRadius: 10,
      padding: 10,
      minWidth: 350,
      minHeight: 120,
      maxHeight: 120,
    },
    overlay: {
      minHeight: 100,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      padding: 14,
      borderRadius: 12,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    edit: { position: "absolute", right: 10, top: 10 },
    progressContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    percentageTextContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    percentageText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
    disabledContainer: {
      opacity: 0.5,
      backgroundColor: "rgba(100, 100, 100, 0.3)",
    },
  });

  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <ImageBackground
          source={require("../../../assets/defaultBackground.jpg")}
          style={styles.background}
          blurRadius={5}
          // opacity={0.5}
        >
          <View style={styles.overlay}>
            <View style={styles.headerRow}>
              <View>
                {module && <Text style={styles.module}>{module}</Text>}
                {lesson && (
                  <Text style={styles.module}>{`Lesson ${lesson}`}</Text>
                )}
                <Text style={styles.title}>{title}</Text>
              </View>

              {!disabled && (
                <View style={styles.progressContainer}>
                  <Svg
                    width={60}
                    height={60}
                    style={{ transform: [{ rotate: "-90deg" }] }}
                  >
                    <Circle
                      cx="30"
                      cy="30"
                      r={radius}
                      stroke="#3d5875"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                    />
                    <Circle
                      cx="30"
                      cy="30"
                      r={radius}
                      stroke="#00bcd4"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </Svg>
                  <View style={styles.percentageTextContainer}>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                  </View>
                </View>
              )}

              {disabled && (
                <View style={styles.lockOverlay}>
                  <MaterialIcons
                    name="lock"
                    size={40}
                    color="rgba(71, 69, 69, 0.9)"
                  />
                </View>
              )}
            </View>
          </View>
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
