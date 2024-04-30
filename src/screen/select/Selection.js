import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import SelectRole from "../../components/customs/SelectRole";
import AppButton from "../../components/customs/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../utilities/redux/slice/setupSlice";
import { useNavigation } from "@react-navigation/native";
import { readUser } from "../../utilities/functions/storeData";

const Selection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.setup.selected);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select role</Text>

      <SelectRole
        source={require("../../../assets/teacher.png")}
        type={"Teacher"}
        onPress={() => dispatch(setSelected("Teacher"))}
        selected={selected === "Teacher"}
      />
      <SelectRole
        source={require("../../../assets/students.png")}
        type={"Student"}
        onPress={() => dispatch(setSelected("Student"))}
        selected={selected === "Student"}
      />
      {selected !== null && (
        <AppButton
          name="Proceed"
          disabled
          width={300}
          height={50}
          bgColor="#6f65a1"
          color="#fff"
          borderRadius={20}
          onPress={() => navigation.navigate(`${selected}-login`)}
        />
      )}
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "#493d8a",
    margin: 10,
  },
});
