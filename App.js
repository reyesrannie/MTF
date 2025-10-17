import { StyleSheet, View, Text } from "react-native";

import Routing from "./src/utilities/routes/Routing";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import {
  getDownloadables,
  getItemsArray,
  getPercentage,
  initDB,
  staticQuery,
  updateItem,
} from "./src/utilities/functions/databaseSetup";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileWithProgress } from "./src/utilities/functions/storeData";
import {
  setSubjectCompletion,
  setSubjectData,
  setUpdateDownloadProgress,
} from "./src/utilities/redux/slice/dataSlice";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const onBoarding = useSelector((state) => state.setup.onboarding);
  const completedSetup = useSelector((state) => state.setup.completedSetup);
  const updateDownloadProgress = useSelector(
    (state) => state.data.updateDownloadProgress
  );

  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const loadingDone = () => {
    if (!fontsLoaded) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    initDB().then(() => {
      console.log("DB setup complete, you can now insert or query.");
      if (onBoarding && completedSetup) {
        downloadFiles();
        loadData();
      }
    });
  }, [onBoarding, completedSetup]);

  const loadData = async () => {
    const getSubjects = await getItemsArray("Subject");
    const res = await getPercentage("Subject");

    dispatch(setSubjectData(getSubjects));
    dispatch(setSubjectCompletion(res));
  };

  const downloadFiles = async () => {
    const getDownloads = await getDownloadables();

    getDownloads?.forEach((items) =>
      dispatch(
        setUpdateDownloadProgress({
          componentID: items?.objectID,
          type: items?.type,
          progress: 0,
        })
      )
    );

    for (const downloads of getDownloads || []) {
      if (downloads?.downloaded !== 1) {
        const res = await downloadFileWithProgress(
          dispatch,
          downloads?.file,
          downloads?.objectID,
          downloads?.type
        );
        await updateItem(
          "forDownloads",
          { objectID: downloads?.objectID, type: downloads?.type },
          {
            downloaded: 1,
          }
        );

        await updateItem(
          "Component",
          { objectID: downloads?.objectID },
          {
            [downloads?.type]: res,
          }
        );
      }
    }
  };

  if (!fontsLoaded || isLoading) {
    return (
      <Modal visible={true}>
        <View style={styles.containerLoading}>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("./assets/loading.json")}
            loop={!fontsLoaded}
            onAnimationFinish={loadingDone}
          />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Routing />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
