import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { keys } from "../../utilities/constants/keys";
import { useDispatch, useSelector } from "react-redux";
import {
  setCmpin,
  setConfirmPin,
  setErrorPIN,
  setMatchPin,
  setMpin,
} from "../../utilities/redux/slice/setupSlice";
import { useNavigation } from "@react-navigation/native";

const CustomKey = ({ handleInsert, handleInsertConfirm }) => {
  const dispatch = useDispatch();
  const confirmPin = useSelector((state) => state.setup.confirmPin);

  return (
    <View style={styles.container}>
      <View style={styles.keyContainer}>
        {keys.map((number, index) => (
          <TouchableOpacity
            key={index}
            disabled={number?.item === null}
            style={
              number?.item === null
                ? styles.keyboardKeysNull
                : styles.keyboardKeys
            }
            onPress={() => {
              confirmPin ? handleInsertConfirm(number) : handleInsert(number);
              dispatch(setErrorPIN(""));
            }}
          >
            {number?.item === "delete" ? (
              <Feather name={number?.item} size={20} color={"white"} />
            ) : (
              <Text style={styles.text}>{number?.value}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomKey;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  disabledKey: {
    display: "none",
  },
  keyboardKeysNull: {
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 4,
  },
  keyboardKeys: {
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(73, 61, 138, 0.8)", // Glass-like background color
    borderColor: "rgba(0, 0, 0, 0.1)", // Light gray border color
    borderWidth: 1,
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
