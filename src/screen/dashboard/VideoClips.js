import React, { useEffect, useRef, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import { setOpenModalImage } from "../../utilities/redux/slice/modalSlice";
import { setImageData } from "../../utilities/redux/slice/dataSlice";

const VideoClips = () => {
  const componentData = useSelector((state) => state.data.componentData);
  const openModalImage = useSelector((state) => state.modal.openModalImage);
  const imageData = useSelector((state) => state.data.imageData);
  const dispatch = useDispatch();

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

  const handleBuffer = () => {
    console.log("Buffering video...");
  };

  const handleVideoError = (error) => {
    console.error("Video Error:", error);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={componentData}
        keyExtractor={(item, index) => `content-${index}`}
        renderItem={({ item, index }) => (
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log(index);
                handlePress(index);
              }}
            >
              <View style={styles.accordionTitle}>
                <Text style={styles.topic}>{item?.name}</Text>
              </View>
            </TouchableWithoutFeedback>
            {show === index && (
              <View style={styles.viewContent}>
                <View style={styles.contents}>
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
              </View>
            )}
          </View>
        )}
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
    fontSize: 10,
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

export default VideoClips;
