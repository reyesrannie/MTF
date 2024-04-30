import {
  Animated,
  BackHandler,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import CustomKey from "../../../components/customs/CustomKey";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCmpin,
  setConfirmPin,
  setErrorPIN,
  setHasError,
  setMatchPin,
  setMpin,
} from "../../../utilities/redux/slice/setupSlice";
import { useUpdateMPINMutation } from "../../../utilities/redux/store/request";
import { setUserData } from "../../../utilities/redux/slice/authSlice";
import Loading from "../../../components/customs/modal/Loading";
import ErrorMessage from "../../../components/customs/modal/ErrorMessage";
import { setupComplete } from "../../../utilities/functions/storeData";
import { useNavigation } from "@react-navigation/native";

const CreatePIN = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mpin = useSelector((state) => state.setup.mpin);
  const cmpin = useSelector((state) => state.setup.cmpin);
  const confirmPin = useSelector((state) => state.setup.confirmPin);
  const matchPIN = useSelector((state) => state.setup.matchPIN);
  const errorPIN = useSelector((state) => state.setup.errorPIN);
  const hasError = useSelector((state) => state.setup.hasError);
  const userData = useSelector((state) => state.auth.userData);
  const shakeAnimationValue = new Animated.Value(0);

  const [updateMPIN, { isLoading }] = useUpdateMPINMutation();

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

  const renderCircleIconsConfirm = () => {
    let circleIcons = [];
    for (let i = 0; i < 4; i++) {
      const iconName = i < cmpin.length ? "circle" : "circle-o";
      circleIcons.push(
        <FontAwesome key={i} name={iconName} size={20} color="black" />
      );
    }
    return circleIcons;
  };

  useEffect(() => {
    const backAction = () => {
      dispatch(setConfirmPin(false));
      dispatch(setMpin(""));
      dispatch(setCmpin(""));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (mpin.length === 4) {
      dispatch(setConfirmPin(true));
    }
    if (cmpin.length === 4) {
      dispatch(setMatchPin(mpin === cmpin));
    }
    if (!matchPIN && confirmPin && matchPIN !== undefined) {
      startShakeAnimation();
    }
    if (matchPIN) {
      updateMPINHandler();
    }
  }, [matchPIN, mpin, cmpin]);

  const handleInsert = (number) => {
    if (number?.item === "delete") {
      dispatch(setMpin(mpin.slice(0, -1)));
    } else if (mpin.length < 4) {
      dispatch(setMpin(mpin + number?.item));
    }
  };

  const handleInsertConfirm = (number) => {
    if (number?.item === "delete") {
      dispatch(setCmpin(cmpin.slice(0, -1)));
    } else if (cmpin.length < 4) {
      dispatch(setCmpin(cmpin + number?.item));
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
      dispatch(setErrorPIN("PIN doesn't match"));
      dispatch(setCmpin(""));
      dispatch(setMpin(""));
      dispatch(setConfirmPin(false));
      dispatch(setMatchPin(undefined));
      shakeAnimationValue.setValue(0);
    });
  };

  const updateMPINHandler = async () => {
    const obj = {
      id: userData?.id,
      mpin: mpin,
    };

    try {
      const res = await updateMPIN(obj).unwrap();
      dispatch(setUserData({ ...userData, mpin: res?.result?.mpin }));
      setupComplete("userData.json", { ...userData, mpin: res?.result?.mpin });
      navigation.navigate("Dashboard");
    } catch (error) {
      dispatch(setHasError(error));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/secure-shield.png")}
        style={styles.image}
      />
      <Text style={styles.textEnter}>
        {confirmPin ? "Confirm Sercurity PIN " : "Create Sercurity PIN"}
      </Text>
      <Text style={styles.textDesc}>
        Your PIN will help protect your account and ensure that only you have
        access. Take control of your security and create your PIN now!
      </Text>
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
        {confirmPin ? renderCircleIconsConfirm() : renderCircleIcons()}
      </Animated.View>
      {errorPIN && <Text style={styles.error}>{errorPIN}</Text>}
      <CustomKey
        handleInsert={handleInsert}
        handleInsertConfirm={handleInsertConfirm}
      />
      <Loading open={isLoading} />
      <ErrorMessage open={hasError !== null} loggedIn />
    </View>
  );
};

export default CreatePIN;

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
    margin: 10,
    marginVertical: 20,
  },
  textEnter: {
    fontSize: 25,
    fontFamily: "Roboto-Black",
    color: "#493d8a",
    marginTop: 40,
    marginBottom: 0,
  },
  textDesc: {
    fontSize: 16,
    fontFamily: "Roboto-Light",
    color: "#493d8a",
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    height: 100,
    width: 100,
  },
  error: {
    marginTop: 10,
    color: "#FF6666",
  },
});
