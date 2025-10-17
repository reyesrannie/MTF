import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CustomDrawerButton from "../../components/customs/CustomDrawerButton";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import CustomDrawerContent from "../../components/customs/CustomDrawerContent";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { setComponent } from "../redux/slice/dataSlice";

import Component from "../../screen/dashboard/Component";
import ComingSoon from "../../components/customs/ComingSoon";

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  return (
    <Tab.Navigator
      initialRouteName="Component"
      screenOptions={{
        headerLeft: () => null,
        headerTitle: () => (
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(setComponent([]));
              navigation.navigate("Content");
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableWithoutFeedback>
        ),
        headerRight: () => !userData?.account && <CustomDrawerButton />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="database-outline"
              size={size}
              color={color}
            />
          ),
        }}
        name="Component"
        component={Component}
      />

      <Tab.Screen
        name="Coming soon"
        component={ComingSoon}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="ab-testing"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="gamepad-variant-outline"
              size={size}
              color={color}
            />
          ),
        }}
        name="Coming soon!"
        component={ComingSoon}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  move: { fontSize: 25, fontFamily: "Roboto-Black", color: "#B6622d" },
  to: { fontSize: 25, fontFamily: "Roboto-Medium", color: "#573111" },
  fit: { fontSize: 25, fontFamily: "Roboto-Light", color: "#1a1d24" },

  mtf: {
    flexDirection: "row",
  },
});

export default BottomNavigation;
