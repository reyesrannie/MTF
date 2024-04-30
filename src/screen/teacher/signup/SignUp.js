import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AppTextBox from "../../../components/customs/AppTextBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "../../../schema/signUpSchema";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../../components/customs/AppButton";
import ErrorMessage from "../../../components/customs/modal/ErrorMessage";
import Loading from "../../../components/customs/modal/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  setCountryCode,
  setHasError,
  setShowCountryCode,
  setShowPassword,
} from "../../../utilities/redux/slice/setupSlice";
import { CountryPicker } from "react-native-country-codes-picker";
import {
  useCreateUserMutation,
  useEmailLoginMutation,
  useValidateEmailMutation,
  useValidateNumberMutation,
  useValidateUsernameMutation,
} from "../../../utilities/redux/store/request";
import { objectError } from "../../../utilities/functions/errorResponse";
import {
  setToken,
  setUserData,
} from "../../../utilities/redux/slice/authSlice";

const SignUp = () => {
  const navigation = useNavigation();
  const showPassword = useSelector((state) => state.setup.showPassword);
  const hasError = useSelector((state) => state.setup.hasError);
  const showCountryCode = useSelector((state) => state.setup.showCountryCode);
  const facebookData = useSelector((state) => state.auth.facebookData);
  const countryCode = useSelector((state) => state.setup.countryCode);

  const emailRef = useRef(null);
  const numberRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const cPasswordRef = useRef(null);

  const dispatch = useDispatch();

  const [validateEmail] = useValidateEmailMutation();
  const [validateNumber] = useValidateNumberMutation();
  const [validateUsername] = useValidateUsernameMutation();
  const [signUp, { isLoading: signupLoading }] = useCreateUserMutation();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      username: "",
      password: "",
      confirm_password: "",
      country: "",
    },
  });

  useEffect(() => {
    if (facebookData) {
      Object.entries(facebookData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [facebookData]);

  const validateData = async (validation) => {
    try {
      if (validation === "email") {
        await validateEmail({ email: watch("email") }).unwrap();
      } else if (validation === "number") {
        await validateNumber({
          number: watch("number").replace(/ /g, ""),
        }).unwrap();
      } else if (validation === "username") {
        await validateUsername({ username: watch("username") }).unwrap();
      }
    } catch (error) {
      objectError(error, setError);
    }
  };

  const submitHandler = async (submitData) => {
    const obj = {
      ...submitData,
      profile_photo: submitData?.picture?.data?.url,
      number: submitData?.number?.replace(/ /g, ""),
      country_code: submitData?.country,
    };
    try {
      const res = await signUp(obj).unwrap();
      dispatch(setUserData(res?.result));
      dispatch(setToken(res?.result?.token));
      navigation.navigate("CreatePIN");
    } catch (error) {
      dispatch(setHasError(error));
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.iconContainer}></View>
        <Text style={styles.welcome}>Welcome To</Text>
        <View style={styles.mtf}>
          <Text style={styles.move}>Move</Text>
          <Text style={styles.to}>To</Text>
          <Text style={styles.fit}>Fit</Text>
        </View>
        <Text style={styles.description}>
          By registering, you agree with the terms of service and privacy
        </Text>
        <AppTextBox
          control={control}
          name={"name"}
          placeholder={"Complete name"}
          icon="account-circle"
          error={Boolean(errors?.name)}
          helperText={errors?.name?.message}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <AppTextBox
          control={control}
          name={"email"}
          placeholder={"Email address"}
          icon="email-box"
          error={Boolean(errors?.email)}
          helperText={errors?.email?.message}
          onSubmitEditing={() => numberRef.current.focus()}
          reff={emailRef}
          onBlur={() => validateData("email")}
          onFocus={() => clearErrors("email")}
        />
        <AppTextBox
          control={control}
          name={"number"}
          placeholder={"Mobile number"}
          icon="cellphone"
          error={Boolean(errors?.number) || Boolean(errors?.country)}
          helperText={errors?.number?.message || errors?.country?.message}
          onSubmitEditing={() => usernameRef.current.focus()}
          reff={numberRef}
          onFocus={() => {
            dispatch(setShowCountryCode(true));
            clearErrors("number");
          }}
          onBlur={() => validateData("number")}
          selectValue={countryCode}
          mobile
        />
        <AppTextBox
          control={control}
          name={"username"}
          placeholder={"Username"}
          icon="human"
          error={Boolean(errors?.username)}
          helperText={errors?.username?.message}
          onSubmitEditing={() => passwordRef.current.focus()}
          reff={usernameRef}
          onBlur={() => validateData("username")}
          onFocus={() => clearErrors("username")}
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
          onSubmitEditing={() => cPasswordRef.current.focus()}
          reff={passwordRef}
        />
        <AppTextBox
          control={control}
          name={"confirm_password"}
          placeholder={"Confirm Password"}
          icon="key"
          secureTextEntry={showPassword}
          endIcon={showPassword ? "eye-off" : "eye"}
          onPress={() => dispatch(setShowPassword(!showPassword))}
          error={Boolean(errors?.confirm_password)}
          helperText={errors?.confirm_password?.message}
          reff={cPasswordRef}
          onSubmitEditing={handleSubmit(submitHandler)}
        />

        <AppButton
          name="Sign up"
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
          <Text style={styles.descSignUp}>Already have an account?</Text>
          <View style={styles.loginContainer}>
            <Text style={styles.descSignUp}>Login</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("User-login")}
            >
              <Text style={styles.loginHere}>here</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* <Loading open={loginLoading} /> */}
        <ErrorMessage open={hasError !== null} />
      </View>
      <CountryPicker
        show={showCountryCode && countryCode === null}
        style={styles.countryPicker}
        pickerButtonOnPress={(item) => {
          setValue("country", item?.dial_code);
          watch("country") !== "" && clearErrors("country");
          dispatch(setCountryCode(`(${item?.dial_code}) `));
          dispatch(setShowCountryCode(false));
        }}
        onBackdropPress={() => dispatch(setShowCountryCode(false))}
      />
      <Loading open={signupLoading} />
      <ErrorMessage open={hasError !== null} />
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  countryPicker: {
    modal: {
      height: 500,
    },
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 4,
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
