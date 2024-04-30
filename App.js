import { StyleSheet, View, Text } from "react-native";

import Routing from "./src/utilities/routes/Routing";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/utilities/redux/store/store";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Modal } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Routing />
        </NavigationContainer>
      </View>
    </Provider>
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
