import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AccountSettings = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account Profile</Text>
      </View>
      <Image
        source={
          userData?.profile_photo
            ? { uri: userData.profile_photo }
            : require("../../../../assets/svg/account.png")
        }
        style={styles.image}
      />
      <TouchableOpacity style={styles.capture}>
        <FontAwesome name="camera" size={24} color="#507793" />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.name}>{userData?.name}</Text>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>
            {userData?.country_code}
            {userData?.number}
          </Text>
        </View>
      </View>
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          For enhanced account security, Keep your account information updated.
        </Text>
      </View>
      <ScrollView style={styles.detailsEdit}>
        <Text style={styles.field}>Name</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>{userData?.name}</Text>

          <TouchableOpacity>
            <FontAwesome name="edit" size={24} color="skyblue" />
          </TouchableOpacity>
        </View>
        <Text style={styles.field}>Mobile</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>
            {userData?.country_code}
            {userData?.number}
          </Text>
          <TouchableOpacity>
            <FontAwesome name="edit" size={24} color="skyblue" />
          </TouchableOpacity>
        </View>
        <Text style={styles.field}>Email</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>{userData?.email}</Text>
          <TouchableOpacity>
            <FontAwesome name="edit" size={24} color="skyblue" />
          </TouchableOpacity>
        </View>
        <Text style={styles.field}>Account Status</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>
            {userData?.verified === null ? "Not Verified" : "Verified"}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          {userData?.verified === null && (
            <TouchableOpacity
              onPress={() => navigation.navigate("VerifyAccount")}
            >
              <Text style={styles.optionsValue}>Verify now</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Text style={styles.optionsValue}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#15253B",
    height: 100,
    width: "100%",
    padding: 10,
    position: "relative",
  },
  title: {
    color: "#f4ce92",
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
  capture: {
    top: 135,
    right: 150,
    position: "absolute",
  },
  image: {
    top: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#f4ce92",
    borderWidth: 5,
    margin: 10,
    position: "absolute",
  },
  details: {
    marginTop: 60,
    alignItems: "center",
  },
  name: {
    color: "#15253B",
    fontFamily: "Roboto-Medium",
    fontSize: 26,
  },
  numberContainer: {
    backgroundColor: "#f4ce92",
    borderRadius: 20,
  },
  number: {
    color: "#15253B",
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    margin: 12,
  },

  disclaimer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#507793",
    opacity: 0.5,
  },
  disclaimerText: {
    color: "black",
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    padding: 12,
  },
  detailsEdit: {
    width: "100%",
    padding: 10,
  },
  field: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
  fieldContainer: {
    padding: 10,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldValue: {
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  optionsContainer: {
    gap: 10,
    padding: 10,
    paddingRight: 20,
    alignItems: "center",
  },
  optionsValue: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "skyblue",
  },
});
