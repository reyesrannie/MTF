import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setCmpin,
  setConfirmPin,
  setHasError,
  setMatchPin,
  setMpin,
} from "../../../utilities/redux/slice/setupSlice";

const ErrorMessage = ({ open, loggedIn }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hasError = useSelector((state) => state.setup.hasError);
  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {hasError?.data?.message?.toUpperCase() || "Error 404"}
          </Text>
          <Text style={styles.message}>
            {hasError?.data?.error ||
              "Connection failed please check your internet"}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(setCmpin(""));
              dispatch(setMpin(""));
              dispatch(setConfirmPin(false));
              dispatch(setMatchPin(undefined));
              dispatch(setHasError(null));
            }}
          >
            <View style={styles.containerRetry}>
              <Text style={styles.retryText}>RETRY</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              !loggedIn && navigation.navigate("selection");
              dispatch(setHasError(null));
            }}
          >
            <View style={styles.containerCancel}>
              <Text style={styles.cancelText}>GO BACK</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    alignItems: "center",
    borderRadius: 20,
    maxWidth: 300,
    minHeight: 100,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontFamily: "Roboto-Bold",
    letterSpacing: 2,
    fontSize: 20,
    color: "#493d8a",
    marginBottom: 5,
  },
  message: {
    fontFamily: "Roboto-Light",
    letterSpacing: 1,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  containerRetry: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#493d8a",
    margin: 5,
    width: 150,
    height: 50,
  },
  retryText: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 2,
    fontSize: 16,
    color: "#493d8a",
  },
  containerCancel: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ff4546",
    margin: 5,
    width: 150,
    height: 50,
  },
  cancelText: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 2,
    fontSize: 16,
    color: "#ff4546",
  },
});
