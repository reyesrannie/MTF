import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomKey from "./CustomKey";
import Loading from "./modal/Loading";
import ErrorMessage from "./modal/ErrorMessage";
import {
  setErrorPIN,
  setMatchPin,
  setMpin,
} from "../../utilities/redux/slice/setupSlice";
import { useNavigation } from "@react-navigation/native";
import { readUser, setupComplete } from "../../utilities/functions/storeData";

const LoginPIN = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mpin = useSelector((state) => state.setup.mpin);
  const errorPIN = useSelector((state) => state.setup.errorPIN);
  const hasError = useSelector((state) => state.setup.hasError);
  const matchPIN = useSelector((state) => state.setup.matchPIN);
  const userData = useSelector((state) => state.auth.userData);

  const shakeAnimationValue = new Animated.Value(0);

  useEffect(() => {
    if (mpin.length === 4) {
      dispatch(setMatchPin(mpin === userData?.mpin));
    }
    if (matchPIN) {
      loadSetup();
    }
    if (matchPIN === false) {
      startShakeAnimation();
    }
  }, [mpin, userData, matchPIN]);

  const loadSetup = async () => {
    try {
      const result = await readUser("userData.json");
      if (result === null) {
        const res = await setupComplete("userData.json", userData);
      }
      navigation.navigate("DrawerRoutes");
    } catch (error) {
      console.log(error);
    }
  };

  const renderCircleIcons = () => {
    let circleIcons = [];
    for (let i = 0; i < 4; i++) {
      const iconName = i < mpin.length ? "circle" : "circle-o";
      circleIcons.push(
        <FontAwesome key={i} name={iconName} size={20} color="black" />
      );
    }
    return circleIcons;
  };

  const handleInsert = (number) => {
    if (number?.item === "delete") {
      dispatch(setMpin(mpin.slice(0, -1)));
    } else if (mpin.length < 4) {
      dispatch(setMpin(mpin + number?.item));
    }
  };

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimationValue, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: -10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      dispatch(setMpin(""));
      dispatch(setMatchPin(undefined));
      dispatch(setErrorPIN("Incorrect PIN"));
      shakeAnimationValue.setValue(0);
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/icon.png")}
        style={styles.image}
      />
      <Text style={styles.textEnter}>Enter your PIN</Text>
      <Text style={styles.textDesc}>Please enter your pin to continue</Text>
      <Animated.View
        style={[
          styles.iconPIN,
          {
            transform: [
              {
                translateX: shakeAnimationValue,
              },
            ],
          },
        ]}
      >
        {renderCircleIcons()}
      </Animated.View>
      {errorPIN && <Text style={styles.error}>{errorPIN}</Text>}
      <CustomKey handleInsert={handleInsert} />
      {/* <Loading open={isLoading} /> */}
      <ErrorMessage open={hasError !== null} loggedIn />
    </View>
  );
};

export default LoginPIN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    paddingTop: 30,
  },
  iconPIN: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "#493d8a",
  },
  textEnter: {
    fontSize: 25,
    fontFamily: "Roboto-Black",
    color: "#493d8a",
    marginTop: 10,
    marginBottom: 0,
  },
  textDesc: {
    fontSize: 16,
    fontFamily: "Roboto-Light",
    color: "#493d8a",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
  error: {
    marginTop: 10,
    color: "#FF6666",
  },
});
