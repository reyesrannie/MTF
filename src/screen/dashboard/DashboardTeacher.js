import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import {
  setModule,
  setModuleCompletion,
} from "../../utilities/redux/slice/dataSlice";
import Subject from "../../components/customs/modal/Subject";
import { FlatList } from "react-native-gesture-handler";
import {
  getItemsArray,
  getPercentage,
} from "../../utilities/functions/databaseSetup";

const DashboardTeacher = () => {
  const openModal = useSelector((state) => state.modal.openModal);
  const subjectData = useSelector((state) => state.data.subjectData);
  const subjectCompletion = useSelector(
    (state) => state.data.subjectCompletion
  );

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

  const handleGetModule = async (data) => {
    try {
      const getModules = await getItemsArray("Module", {
        subject_object_id: data?.objectID,
      });
      dispatch(setModule(getModules));

      const res = await getPercentage("Module");
      dispatch(setModuleCompletion(res));
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subjectData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const percent = subjectCompletion?.find(
            (sub) => sub?.objectID === item?.objectID
          )?.completion_percentage;

          return (
            <Card
              module={item.name}
              title={item.accessCode}
              percentage={percent}
              onPress={() => {
                handleGetModule(item);
              }}
            />
          );
        }}
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
