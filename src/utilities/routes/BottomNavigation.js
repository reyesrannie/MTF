import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Content from "../../screen/dashboard/Content";
import CustomDrawerButton from "../../components/customs/CustomDrawerButton";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import CustomDrawerContent from "../../components/customs/CustomDrawerContent";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setContent, setLesson } from "../redux/slice/dataSlice";
import Photos from "../../screen/dashboard/Photos";
import VideoClips from "../../screen/dashboard/VideoClips";

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const contentData = useSelector((state) => state.data.contentData);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Tab.Navigator
      initialRouteName="Content"
      screenOptions={{
        headerLeft: () => null,
        headerTitle: () => (
          <TouchableWithoutFeedback
            onPress={() => {
              contentData === null && dispatch(setLesson(null));
              contentData !== null && dispatch(setContent(null));

              navigation.navigate(
                contentData !== null ? "Lesson" : "Dashboard"
              );
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
        name="Content"
        component={Content}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="photo" size={size} color={color} />
          ),
        }}
        name="Photos"
        component={Photos}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video" size={size} color={color} />
          ),
        }}
        name="Videos"
        component={VideoClips}
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
