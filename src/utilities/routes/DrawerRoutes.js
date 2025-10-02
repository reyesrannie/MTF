import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Dashboard from "../../screen/dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import CustomDrawerButton from "../../components/customs/CustomDrawerButton";
import CustomDrawerContent from "../../components/customs/CustomDrawerContent";
import AccountSettings from "../../screen/teacher/account/AccountSettings";
import { useNavigation } from "@react-navigation/native";
import VerifyAccount from "../../screen/teacher/account/VerifyAccount";
import Lesson from "../../screen/dashboard/Lesson";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setLesson, setModule } from "../redux/slice/dataSlice";
import DashboardTeacher from "../../screen/dashboard/DashboardTeacher";

const DrawerRoutes = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const module = useSelector((state) => state.data.module);
  const lessonData = useSelector((state) => state.data.lessonData);

  return (
    <Drawer.Navigator
      initialRouteName={"DashTeacher"}
      screenOptions={{
        headerLeft: () => null,
        headerTitle: () =>
          lessonData !== null ? (
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(setLesson(null));
                navigation.navigate("Dashboard");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(setModule([]));
                navigation.navigate("DashTeacher");
              }}
            >
              {module?.length === 0 ? (
                <View style={styles.mtf}>
                  <Text style={styles.move}>Move</Text>
                  <Text style={styles.to}>To</Text>
                  <Text style={styles.fit}>Fit</Text>
                </View>
              ) : (
                <Ionicons name="arrow-back" size={24} color="black" />
              )}
            </TouchableWithoutFeedback>
          ),
        headerRight: () => !userData?.account && <CustomDrawerButton />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="DashTeacher" component={DashboardTeacher} />
      <Drawer.Screen name="Lesson" component={Lesson} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
      <Drawer.Screen name="VerifyAccount" component={VerifyAccount} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;

const styles = StyleSheet.create({
  move: { fontSize: 25, fontFamily: "Roboto-Black", color: "#B6622d" },
  to: { fontSize: 25, fontFamily: "Roboto-Medium", color: "#573111" },
  fit: { fontSize: 25, fontFamily: "Roboto-Light", color: "#1a1d24" },

  mtf: {
    flexDirection: "row",
  },
});
