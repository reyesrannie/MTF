import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import { setLesson } from "../../utilities/redux/slice/dataSlice";
import { getItemsArray } from "../../utilities/functions/databaseSetup";

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const module = useSelector((state) => state.data.module);

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

  const getLesson = async () => {
    try {
      const getLessonDB = await getItemsArray("Lesson");
      console.log(getLessonDB);
      dispatch(setLesson(getLessonDB));
      navigation.navigate("Lesson");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {module?.map((list, index) => {
          return (
            <Card
              key={index}
              module={list.name}
              title={list.title}
              image={list?.image}
              onPress={() => {
                getLesson();
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
