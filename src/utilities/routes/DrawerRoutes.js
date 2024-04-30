import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Dashboard from "../../screen/dashboard/Dashboard";
import { useSelector } from "react-redux";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import CustomDrawerButton from "../../components/customs/CustomDrawerButton";
import CustomDrawerContent from "../../components/customs/CustomDrawerContent";
import AccountSettings from "../../screen/teacher/account/AccountSettings";
import { useNavigation } from "@react-navigation/native";
import VerifyAccount from "../../screen/teacher/account/VerifyAccount";

const DrawerRoutes = () => {
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerLeft: () => null,
        headerTitle: () => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Dashboard")}
          >
            <View style={styles.mtf}>
              <Text style={styles.move}>Move</Text>
              <Text style={styles.to}>To</Text>
              <Text style={styles.fit}>Fit</Text>
            </View>
          </TouchableWithoutFeedback>
        ),
        headerRight: () => <CustomDrawerButton />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
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
