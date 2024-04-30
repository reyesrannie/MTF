import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { route } from "../../utilities/constants/routes";
import { setMatchPin, setMpin } from "../../utilities/redux/slice/setupSlice";

const CustomDrawerContent = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView>
      <View style={styles.content}>
        <Image
          source={
            userData?.profile_photo
              ? { uri: userData.profile_photo }
              : require("../../../assets/svg/account.png")
          }
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.number}>
            {userData?.country_code}
            {userData?.number}
          </Text>
          {userData?.verified === null ? (
            <View style={styles.editProfile}>
              <FontAwesome name="lock" size={14} color="#1a1d24" />
              <Text style={styles.number}>Not Verified</Text>
            </View>
          ) : (
            <View style={styles.editProfile}>
              <FontAwesome name="check" size={14} color="#008000" />
              <Text style={styles.verified}>Verified</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate("AccountSettings");
            }}
          >
            <View style={styles.editProfile}>
              <FontAwesome name="edit" size={12} color="#B6622d" />
              <Text style={styles.edit}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      {route?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate(item.route);
              item.title === "Logout" && dispatch(setMatchPin(undefined));
              item.title === "Logout" && dispatch(setMpin(""));
            }}
          >
            <View style={styles.nav}>
              <Text style={styles.title}>{item.title}</Text>
              <MaterialIcons name="navigate-next" size={24} color="#1a1d24" />
            </View>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  details: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 10,
  },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10,
  },
  name: { fontSize: 20, fontFamily: "Roboto-Bold", color: "#1a1d24" },
  number: { fontSize: 12, fontFamily: "Roboto-Light", color: "#1a1d24" },
  verified: { fontSize: 12, fontFamily: "Roboto-Light", color: "#008000" },
  edit: { fontSize: 12, fontFamily: "Roboto-Light", color: "#B6622d" },
  title: { fontSize: 14, fontFamily: "Roboto-Medium", color: "#1a1d24" },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a1d24",
    marginHorizontal: 10,
    marginBottom: 15,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 1,
  },
});
