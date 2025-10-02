import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import AppButton from "../../../components/customs/AppButton";
import AppTextBox from "../../../components/customs/AppTextBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setHasError,
  setShowPassword,
} from "../../../utilities/redux/slice/setupSlice";
import { useLoginMutation } from "../../../utilities/redux/store/request";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../../schema/loginSchema";
import Loading from "../../../components/customs/modal/Loading";
import ErrorMessage from "../../../components/customs/modal/ErrorMessage";
import { useNavigation } from "@react-navigation/native";
import {
  setToken,
  setUserData,
} from "../../../utilities/redux/slice/authSlice";

const UserLogin = () => {
  const navigation = useNavigation();
  const showPassword = useSelector((state) => state.setup.showPassword);
  const hasError = useSelector((state) => state.setup.hasError);
  const usernameRef = useRef(null);

  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitHandler = async (submitData) => {
    try {
      const res = await loginUser(submitData).unwrap();
      dispatch(setUserData(res));
      dispatch(setToken(res?.token));
      navigation.navigate(res?.mpin === null ? "CreatePIN" : "LoginPIN");
    } catch (error) {
      dispatch(setHasError(error));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}></View>
      <Text style={styles.welcome}>Welcome To</Text>
      <View style={styles.mtf}>
        <Text style={styles.move}>Move</Text>
        <Text style={styles.to}>To</Text>
        <Text style={styles.fit}>Fit</Text>
      </View>
      <Text style={styles.description}>
        By tapping log in, you will agree with the terms of service and privacy
      </Text>

      <AppTextBox
        control={control}
        name={"username"}
        placeholder={"Username"}
        icon="account-circle"
        error={Boolean(errors?.username)}
        onSubmitEditing={() => usernameRef.current.focus()}
        helperText={errors?.username?.message}
      />
      <AppTextBox
        control={control}
        name={"password"}
        placeholder={"Password"}
        icon="key"
        secureTextEntry={showPassword}
        endIcon={showPassword ? "eye-off" : "eye"}
        onPress={() => dispatch(setShowPassword(!showPassword))}
        error={Boolean(errors?.password)}
        helperText={errors?.password?.message}
        onSubmitEditing={handleSubmit(submitHandler)}
        reff={usernameRef}
      />

      <AppButton
        name="Login"
        disabled
        width={100}
        height={40}
        bgColor="#6f65a1"
        color="#fff"
        borderRadius={50}
        iconColor={"#fff"}
        onPress={handleSubmit(submitHandler)}
      />

      <View style={styles.signUp}>
        <Text style={styles.descSignUp}>Don't have an account?</Text>
        <View style={styles.loginContainer}>
          <Text style={styles.descSignUp}>Sign up</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Sign-up")}
          >
            <Text style={styles.loginHere}>here</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Loading open={loginLoading} />
      <ErrorMessage open={hasError !== null} />
    </View>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  lottie: {
    width: 300,
    height: 300,
  },
  loginContainer: {
    gap: 5,
    justifyContent: "center",
    flexDirection: "row",
  },
  loginHere: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Roboto-Medium",
    color: "#493d8a",
    opacity: 0.6,
  },
});
