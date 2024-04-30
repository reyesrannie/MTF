import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppButton from "../../components/customs/AppButton";
import { useNavigation } from "@react-navigation/native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { useDispatch, useSelector } from "react-redux";
import {
  setFacebookData,
  setUserData,
} from "../../utilities/redux/slice/authSlice";
import { useEmailLoginMutation } from "../../utilities/redux/store/request";
import { setHasError } from "../../utilities/redux/slice/setupSlice";
import Loading from "../../components/customs/modal/Loading";
import ErrorMessage from "../../components/customs/modal/ErrorMessage";

WebBrowser.maybeCompleteAuthSession();

const TeacherLogin = () => {
  const navigation = useNavigation();
  const hasError = useSelector((state) => state.setup.hasError);
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  const [emailLogin, { isLoading }] = useEmailLoginMutation();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FB_ID,
  });

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,email,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        dispatch(setFacebookData(userInfo));
        await loginHandler(userInfo);
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      console.log("something went wrong");
      return;
    }
  };

  const loginHandler = async (userInfo) => {
    try {
      const res = await emailLogin({
        email: userInfo?.email,
      }).unwrap();
      dispatch(setUserData(res));
      res?.mpin === null
        ? navigation.navigate("CreatePIN")
        : navigation.navigate("LoginPIN");
    } catch (error) {
      error?.status !== 422 && dispatch(setHasError(error));
      error?.status !== "FETCH_ERROR" && navigation.navigate("Sign-up");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconContainer1}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.icon}
          />
        </View>
      </View>
      <Text style={styles.welcome}>Welcome To</Text>
      <View style={styles.mtf}>
        <Text style={styles.move}>Move</Text>
        <Text style={styles.to}>To</Text>
        <Text style={styles.fit}>Fit</Text>
      </View>
      <Text style={styles.description}>
        By tapping log in, you will agree with the terms of service and privacy
      </Text>
      <AppButton
        name="Login with Username"
        disabled
        width={280}
        height={50}
        bgColor="#6f65a1"
        color="#fff"
        borderRadius={50}
        icon={"unlock-alt"}
        iconColor={"#fff"}
        onPress={() => navigation.navigate("User-login")}
      />
      <AppButton
        name="Login with Facebook"
        disabled
        width={280}
        height={50}
        bgColor="#316FF6"
        color="#fff"
        borderRadius={50}
        icon={"facebook-square"}
        iconColor={"#fff"}
        onPress={handlePressAsync}
      />
      <AppButton
        name="Login with Google"
        disabled
        width={280}
        height={50}
        bgColor="#34A853"
        color="#fff"
        borderRadius={50}
        icon={"google-plus"}
        iconColor={"#fff"}
      />
      <View style={styles.signUp}>
        <Text style={styles.descSignUp}>Don't have an account?</Text>
      </View>

      <AppButton
        onPress={() => navigation.navigate("Sign-up")}
        name="Sign up"
        disabled
        width={280}
        height={50}
        bgColor="#610C04"
        color="#fff"
        borderRadius={50}
      />
      <Loading open={isLoading} />
      <ErrorMessage open={hasError !== null} />
    </View>
  );
};

export default TeacherLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  iconContainer: {
    marginVertical: 40,
    marginBottom: 20,
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer1: {
    backgroundColor: "#fff",
  },
  icon: {
    width: 200,
    height: 200,
  },
  welcome: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "#493d8a",
  },
  move: { fontSize: 40, fontFamily: "Roboto-Black", color: "#B6622d" },
  to: { fontSize: 40, fontFamily: "Roboto-Medium", color: "#573111" },
  fit: { fontSize: 40, fontFamily: "Roboto-Light", color: "#1a1d24" },

  mtf: {
    flexDirection: "row",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Roboto-Light",
    color: "#000",
    opacity: 0.4,
    marginBottom: 20,
  },
  signUp: {
    margin: 20,
  },
  descSignUp: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Roboto-Light",
    color: "#000",
    opacity: 0.4,
  },
});
