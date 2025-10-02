import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import AppTextBox from "../../../components/customs/AppTextBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import studentSchema from "../../../schema/studentSchema";
import { pathFitOne } from "../../../utilities/constants/initialContents";
import { setupComplete } from "../../../utilities/functions/storeData";
import { useNavigation } from "@react-navigation/native";

const StudentLogin = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      lesson_password: "",
    },
  });

  const submitHandler = async (submitData) => {
    try {
      if (submitData?.lesson_password === process.env.EXPO_PUBLIC_Lesson_Code) {
        const obj = {
          account: "Student",
        };

        const res = await setupComplete("userData.json", { ...obj });
        navigation.navigate("DrawerRoutes");
      } else {
        setError("lesson_password", {
          message: "Code doesn't match!",
          type: "validate",
        });
      }
    } catch (error) {
      setError("lesson_password", {
        message: "Code doesn't match!",
        type: "validate",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Code</Text>
      <Image
        source={require("../../../../assets/secure-shield.png")}
        style={styles.image}
      />
      <Text style={styles.textEnter}>Enter Sercurity Code</Text>
      <Text style={styles.textDesc}>
        The code was sent to you by your Instructor if you don't have the code
        please contact your Instructor
      </Text>

      <AppTextBox
        control={control}
        name={"lesson_password"}
        placeholder="Enter Code"
        error={Boolean(errors?.lesson_password)}
        helperText={errors?.lesson_password?.message}
        endIcon={watch("lesson_password") && "arrow-right"}
        onPress={handleSubmit(submitHandler)}
      />
    </View>
  );
};

export default StudentLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "#493d8a",
    margin: 10,
    marginVertical: 20,
  },
  textEnter: {
    fontSize: 25,
    fontFamily: "Roboto-Black",
    color: "#493d8a",
    marginTop: 40,
    marginBottom: 0,
  },
  textDesc: {
    fontSize: 16,
    fontFamily: "Roboto-Light",
    color: "#493d8a",
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    height: 100,
    width: 100,
  },
});
