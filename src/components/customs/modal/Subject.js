import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../../utilities/redux/slice/modalSlice";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import subjectSchema from "../../../schema/subjectSchema";
import AppButton from "../AppButton";
import AppTextBox from "../AppTextBox";

const Subject = ({ open }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subjectSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 10,
    },
    modalDetails: {
      backgroundColor: "white",
      overflow: "hidden",
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      gap: 10,
    },
    title: {
      fontFamily: "Roboto-Bold",
      fontSize: 20,
    },
    buttonSubmit: {
      backgroundColor: "green",
      width: 70,
      height: 35,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonClose: {
      backgroundColor: "red",
      width: 70,
      height: 35,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalDetails}>
          <Text style={styles.title}>Create new subject</Text>
          <AppTextBox
            control={control}
            name={"name"}
            placeholder={"Enter subject name"}
          />
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.buttonSubmit}>
                <MaterialIcons name="check" size={24} color="white" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(setOpenModal(false));
              }}
            >
              <View style={styles.buttonClose}>
                <MaterialIcons name="close" size={24} color="white" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Subject;
