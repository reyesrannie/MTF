import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import {
  setLesson,
  setLessonCompletion,
  setSubjectData,
} from "../../utilities/redux/slice/dataSlice";
import {
  getItemsArray,
  getPercentage,
  updateItem,
} from "../../utilities/functions/databaseSetup";

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const module = useSelector((state) => state.data.module);
  const moduleCompletion = useSelector((state) => state.data.moduleCompletion);

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
  });

  const getLesson = async (data) => {
    try {
      const getLessonDB = await getItemsArray("Lesson", {
        module_object_id: data?.objectID,
      });
      dispatch(setLesson(getLessonDB));
      const res = await getPercentage("Lesson");
      dispatch(setLessonCompletion(res));
      navigation.navigate("Lesson");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (module?.every((item) => item?.isDone === 1)) {
      updateSubject();
    }
  }, [module]);

  const updateSubject = async () => {
    try {
      await updateItem(
        "Subject",
        { objectID: module[0]?.subject_object_id },
        {
          isDone: 1,
        }
      );
      const updatedSubject = await getItemsArray("Subject");

      dispatch(setSubjectData(updatedSubject));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {module?.map((list, index) => {
          const percent = moduleCompletion?.find(
            (mod) => mod?.objectID === list?.objectID
          )?.completion_percentage;

          return (
            <Card
              key={index}
              module={list.name}
              title={list.title}
              percentage={percent}
              onPress={() => {
                getLesson(list);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
