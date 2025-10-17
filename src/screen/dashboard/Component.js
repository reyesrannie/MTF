import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalImage } from "../../utilities/redux/slice/modalSlice";
import {
  setComponent,
  setContent,
  setContentCompletion,
  setImageData,
  setLessonCompletion,
  setModuleCompletion,
  setSubjectCompletion,
} from "../../utilities/redux/slice/dataSlice";
import Video from "react-native-video";
import AppButton from "../../components/customs/AppButton";
import {
  getItemsArray,
  getPercentage,
  updateItem,
} from "../../utilities/functions/databaseSetup";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const Component = () => {
  const componentData = useSelector((state) => state.data.componentData);
  const contentData = useSelector((state) => state.data.contentData);
  const openModalImage = useSelector((state) => state.modal.openModalImage);
  const updateDownloadProgress = useSelector(
    (state) => state.data.updateDownloadProgress
  );

  const imageData = useSelector((state) => state.data.imageData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [show, setShow] = useState(null);
  const [showContent, setShowContent] = useState(null);

  // Enable layout animation on Android
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const handlePress = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShow(show === index ? null : index);
    setShowContent(null);
  };

  const handleShowContent = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowContent(showContent === index ? null : index);
  };

  const handleBuffer = () => {};

  const handleVideoError = (error) => {};

  const handleNextComponent = async (data) => {
    try {
      await updateItem(
        "Component",
        { objectID: data?.objectID },
        {
          isDone: 1,
        }
      );

      if (componentData?.filter((count) => count?.isDone === 0).length === 1) {
        await updateItem(
          "Content",
          { objectID: data?.content_object_id },
          {
            isDone: 1,
          }
        );
        const updatedContent = await getItemsArray("Content", {
          lesson_object_id: contentData[0]?.lesson_object_id,
        });

        dispatch(setContent(updatedContent));
        await updateMobile(data);
        navigation.navigate("Content");
      }
      setShow(null);
      await updateMobile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMobile = async (data) => {
    const getComponent = await getItemsArray("Component", {
      content_object_id: data?.content_object_id,
    });
    dispatch(setComponent(getComponent));

    const sub = await getPercentage("Subject");
    dispatch(setSubjectCompletion(sub));
    const mod = await getPercentage("Module");
    dispatch(setModuleCompletion(mod));
    const les = await getPercentage("Lesson");
    dispatch(setLessonCompletion(les));
    const content = await getPercentage("Content");
    dispatch(setContentCompletion(content));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={componentData}
        keyExtractor={(item, index) => `content-${index}`}
        renderItem={({ item, index }) => {
          const downloadingItems = updateDownloadProgress?.filter(
            (dl) => dl?.objectID === item?.objectID
          );
          const totalProgress = downloadingItems?.reduce(
            (sum, file) => sum + file.progress,
            0
          );
          const averageProgress =
            downloadingItems?.length > 0
              ? totalProgress / downloadingItems.length
              : 1;

          const prevItem = componentData[index - 1];
          const isPrevDone = !prevItem || prevItem.isDone === 1;
          const isDisabled = !isPrevDone;

          return (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  handlePress(index);
                }}
                disabled={isDisabled}
              >
                <View
                  style={[
                    styles.accordionTitle,
                    isDisabled && { opacity: 0.5 },
                  ]}
                >
                  <Text style={styles.topic}>{item?.name}</Text>
                  {averageProgress !== 1 && (
                    <Progress.Circle progress={averageProgress} showsText />
                  )}
                </View>
              </TouchableWithoutFeedback>
              {show === index && (
                <View style={styles.viewContent}>
                  <View style={styles.contents}>
                    <Text style={styles?.definition}>{item?.definition}</Text>
                    {item?.image && (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          dispatch(setImageData({ uri: item.image }));
                          dispatch(setOpenModalImage(true));
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{ uri: item.image }}
                        />
                      </TouchableWithoutFeedback>
                    )}
                    {item?.video && (
                      <Video
                        source={{ uri: item.video }}
                        style={styles.backgroundVideo}
                        controls
                        onBuffer={handleBuffer}
                        onError={handleVideoError}
                        paused
                      />
                    )}
                  </View>
                  {item?.isDone === 0 && (
                    <AppButton
                      name={`${
                        componentData?.filter((count) => count?.isDone === 0)
                          .length > 1
                          ? "Next"
                          : "Mission Complete"
                      }`}
                      disabled
                      height={40}
                      bgColor="#267003ff"
                      color="#fff"
                      borderRadius={50}
                      iconColor={"#fff"}
                      onPress={() => handleNextComponent(item)}
                    />
                  )}
                </View>
              )}
            </View>
          );
        }}
      />

      <Modal
        visible={openModalImage}
        transparent
        onRequestClose={() => dispatch(setOpenModalImage(false))}
      >
        <TouchableWithoutFeedback
          style={styles.modalContainer}
          onPress={() => dispatch(setOpenModalImage(false))}
        >
          <Image style={styles.modalImage} source={imageData} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  topic: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    alignSelf: "center",
  },
  accordionTitle: {
    backgroundColor: "#f4ce92",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewContent: {
    backgroundColor: "#FFFFFF",
  },
  buttonTitle: {
    backgroundColor: "#1a1d24",
    borderRadius: 10,
    margin: 5,
  },
  topicTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    alignSelf: "center",
    color: "#f4ce92",
  },
  contents: {
    margin: 10,
  },
  definition: {
    fontFamily: "Roboto-Light",
    fontSize: 20,
    textAlign: "justify",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  backgroundVideo: {
    height: 200,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
});

export default Component;
