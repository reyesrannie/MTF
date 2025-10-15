import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Selection from "../../screen/select/Selection";
import OnBoarding from "../../components/customs/OnBoarding";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompletedSetup,
  setIsLoading,
  setOnboarding,
} from "../redux/slice/setupSlice";
import { readFile, readUser } from "../functions/storeData";
import LottieView from "lottie-react-native";
import StudentLogin from "../../screen/student/login/StudentLogin";
import TeacherLogin from "../../screen/teacher/TeacherLogin";
import UserLogin from "../../screen/teacher/login/UserLogin";
import { Modal } from "react-native";
import { setToken, setUserData } from "../redux/slice/authSlice";
import SignUp from "../../screen/teacher/signup/SignUp";
import CreatePIN from "../../screen/teacher/signup/CreatePIN";
import LoginPIN from "../../components/customs/LoginPIN";
import DrawerRoutes from "./DrawerRoutes";
import BottomNavigation from "./BottomNavigation";

const Routing = () => {
  const onBoarding = useSelector((state) => state.setup.onboarding);
  const completedSetup = useSelector((state) => state.setup.completedSetup);
  const isLoading = useSelector((state) => state.setup.isLoading);
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const loadOnboarding = async () => {
      const result = await readFile("onboarding.txt");
      dispatch(setOnboarding(result));
    };

    loadOnboarding();
  }, [dispatch]);

  useEffect(() => {
    const loadSetup = async () => {
      const result = await readFile("allSet.txt");
      dispatch(setCompletedSetup(result));
    };

    loadSetup();
  }, [dispatch]);

  const loadingDone = () => {
    if (onBoarding === null) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  };

  return onBoarding === null || isLoading ? (
    <Modal visible={true}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../../../assets/loading.json")}
          loop={onBoarding === null}
          onAnimationFinish={loadingDone}
        />
      </View>
    </Modal>
  ) : !completedSetup ? (
    <Stack.Navigator
      initialRouteName={onBoarding ? "selection" : "onboarding"}
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: { animation: "timing", config: { duration: 300 } },
          close: { animation: "timing", config: { duration: 300 } },
        },
      }}
    >
      <Stack.Screen
        name="onboarding"
        component={
          onBoarding !== null || onBoarding === false ? OnBoarding : Selection
        }
      />
      <Stack.Screen
        name="selection"
        component={Selection}
        options={{ animation: "fade" }}
      />
      <Stack.Screen name="Student-login" component={StudentLogin} />
      <Stack.Screen name="Teacher-login" component={TeacherLogin} />
      <Stack.Screen
        name="User-login"
        component={UserLogin}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="DrawerRoutes"
        component={DrawerRoutes}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Sign-up"
        component={SignUp}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="CreatePIN"
        component={CreatePIN}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName={"DrawerRoutes"}
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: { animation: "timing", config: { duration: 300 } },
          close: { animation: "timing", config: { duration: 300 } },
        },
      }}
    >
      <Stack.Screen
        name="DrawerRoutes"
        component={DrawerRoutes}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="LoginPIN"
        component={LoginPIN}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="CreatePIN"
        component={CreatePIN}
        options={{
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Routing;
