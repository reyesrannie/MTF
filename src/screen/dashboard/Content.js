import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/customs/Card";
import { useNavigation } from "@react-navigation/native";
import {
  setComponent,
  setComponentCompletion,
  setLesson,
} from "../../utilities/redux/slice/dataSlice";
import {
  getItemsArray,
  getPercentage,
  updateItem,
} from "../../utilities/functions/databaseSetup";

const Content = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.data.contentData);
  const contentCompletion = useSelector(
    (state) => state.data.contentCompletion
  );

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      borderRadius: 10,
    },
  });

  const handleGetComponent = async (data) => {
    try {
      const getComponent = await getItemsArray("Component", {
        content_object_id: data?.objectID,
      });
      dispatch(setComponent(getComponent));
      const res = await getPercentage("Component");
      dispatch(setComponentCompletion(res));

      navigation.navigate("BottomNavigation");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contentData?.every((item) => item?.isDone === 1)) {
      updateLesson();
    }
  }, [contentData]);

  const updateLesson = async () => {
    try {
      await updateItem(
        "Lesson",
        { objectID: contentData[0]?.lesson_object_id },
        {
          isDone: 1,
        }
      );
      const updatedLesson = await getItemsArray("Lesson", {
        objectID: contentData[0]?.lesson_object_id,
      });

      dispatch(setLesson(updatedLesson));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {contentData?.map((list, index) => {
          const percent = contentCompletion?.find(
            (les) => les?.objectID === list?.objectID
          )?.completion_percentage;

          const prevItem = contentData[index - 1];
          const isPrevDone = !prevItem || prevItem.isDone === 1;
          const isDisabled = !isPrevDone;

          return (
            <Card
              disabled={isDisabled}
              key={index}
              module={list?.topic}
              percentage={percent}
              onPress={() => {
                !isDisabled && handleGetComponent(list);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Content;
