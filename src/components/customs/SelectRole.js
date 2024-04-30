import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const SelectRole = ({ source, type, selected, onPress }) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: selected ? "#6f65a1" : null,
      padding: 50,
      margin: 20,
      borderRadius: 20,
    },

    image: {
      width: 100,
      height: 100,
      margin: 15,
      tintColor: selected ? undefined : "gray",
      opacity: selected ? undefined : 0.6,
    },
    check: {
      position: "absolute",
      bottom: -30,
      width: 50,
      height: 50,
      margin: 15,
    },
    text: {
      fontFamily: "Roboto-Medium",
      letterSpacing: 2,
      color: selected ? "#fff" : null,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image source={source} style={styles.image} />
        <Text style={styles.text}>{type}</Text>
        {selected && (
          <Image
            source={require("../../../assets/check.png")}
            style={styles.check}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectRole;
