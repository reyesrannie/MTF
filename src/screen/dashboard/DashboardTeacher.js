import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import { setModule } from "../../utilities/redux/slice/dataSlice";
import { setOpenModal } from "../../utilities/redux/slice/modalSlice";
import Subject from "../../components/customs/modal/Subject";
import { pathFitOne } from "../../utilities/constants/initialContents";
import { FlatList } from "react-native-gesture-handler";

const DashboardTeacher = () => {
  const openModal = useSelector((state) => state.modal.openModal);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
    },
    button: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 70,
      position: "absolute",
      bottom: 10,
      right: 10,
      height: 70,
      backgroundColor: "#fff",
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={pathFitOne}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            module={item.subject}
            title={item.accessCode}
            onPress={() => {
              dispatch(setModule(item?.module));
              navigation.navigate("Dashboard");
            }}
          />
        )}
      />

      {/* {!userData?.account && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(setOpenModal(true))}
        >
          <MaterialIcons name="add" size={24} color="black" />
        </TouchableOpacity>
      )} */}

      <Subject open={openModal} />
    </View>
  );
};

export default DashboardTeacher;
