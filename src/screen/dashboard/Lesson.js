import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import { setContent } from "../../utilities/redux/slice/dataSlice";

const Lesson = () => {
  const dispatch = useDispatch();
  const lessonData = useSelector((state) => state.data.lessonData);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      borderRadius: 10,
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        {lessonData?.map((list, index) => {
          return (
            <Card
              key={index}
              name={list.name}
              lesson={index + 1}
              title={list.title}
              onPress={() => {
                dispatch(setContent(list?.content));
                navigation.navigate("BottomNavigation");
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Lesson;
