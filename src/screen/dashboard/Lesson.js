import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import {
  setContent,
  setContentCompletion,
  setModule,
} from "../../utilities/redux/slice/dataSlice";
import {
  getItemsArray,
  getPercentage,
  updateItem,
} from "../../utilities/functions/databaseSetup";

const Lesson = () => {
  const dispatch = useDispatch();
  const lessonData = useSelector((state) => state.data.lessonData);
  const lessonCompletion = useSelector((state) => state.data.lessonCompletion);

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      borderRadius: 10,
    },
  });

  const handleGetContent = async (data) => {
    try {
      const getContent = await getItemsArray("Content", {
        lesson_object_id: data?.objectID,
      });
      dispatch(setContent(getContent));
      const res = await getPercentage("Content");
      dispatch(setContentCompletion(res));
      navigation.navigate("Content");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lessonData?.every((item) => item?.isDone === 1)) {
      updateModule();
    }
  }, [lessonData]);

  const updateModule = async () => {
    try {
      await updateItem(
        "Module",
        { objectID: lessonData[0]?.module_object_id },
        {
          isDone: 1,
        }
      );
      const updatedModule = await getItemsArray("Module", {
        objectID: lessonData[0]?.module_object_id,
      });

      dispatch(setModule(updatedModule));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {lessonData?.map((list, index) => {
          const percent = lessonCompletion?.find(
            (les) => les?.objectID === list?.objectID
          )?.completion_percentage;

          const prevItem = lessonData[index - 1];
          const isPrevDone = !prevItem || prevItem.isDone === 1;
          const isDisabled = !isPrevDone;

          return (
            <Card
              disabled={isDisabled}
              key={index}
              name={list.name}
              lesson={index + 1}
              title={list.title}
              percentage={percent}
              onPress={() => {
                handleGetContent(list);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Lesson;
