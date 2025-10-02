import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import { setLesson } from "../../utilities/redux/slice/dataSlice";

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

  return (
    <View style={styles.container}>
      <ScrollView>
        {module?.map((list, index) => {
          return (
            <Card
              key={index}
              module={list.module}
              title={list.title}
              image={list?.image}
              onPress={() => {
                dispatch(setLesson(list?.lesson));
                navigation.navigate("Lesson");
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
