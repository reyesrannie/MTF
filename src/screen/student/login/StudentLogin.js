import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import AppTextBox from "../../../components/customs/AppTextBox";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import studentSchema from "../../../schema/studentSchema";
import { useNavigation } from "@react-navigation/native";

import {
  useLazyModuleQuery,
  useLazySubjectQuery,
} from "../../../utilities/redux/store/request";
import {
  getItems,
  insertOrIgnore,
} from "../../../utilities/functions/databaseSetup";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {
  downloadFile,
  onBoardingDone,
  readFile,
  readUser,
  setupComplete,
} from "../../../utilities/functions/storeData";
import { useDispatch } from "react-redux";
import { setCompletedSetup } from "../../../utilities/redux/slice/setupSlice";
import Loading from "../../../components/customs/modal/Loading";
import { setUpdateDownloadProgress } from "../../../utilities/redux/slice/dataSlice";

const StudentLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [rendering, setRendering] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      accessCode: "",
    },
  });

  const [getSubject, { isLoading: loadingSubject }] = useLazySubjectQuery();

  const submitHandler = async (submitData) => {
    try {
      await setupComplete("PendingDownloads.json", []);
      const res = await getSubject(submitData?.accessCode).unwrap();
      setRendering(true);
      await insertOrIgnore("Subject", {
        objectID: res?.data?.id,
        name: res?.data?.name,
      });
      const getSubjectDB = await getItems("Subject", {
        objectID: res?.data?.id,
      });

      for (const module of res?.data?.modules || []) {
        await insertOrIgnore("Module", {
          objectID: module?.id,
          subject_object_id: res?.data?.id,
          subject_id: getSubjectDB?.id,
          title: module?.title,
          name: module?.name,
        });
        const getModuleDB = await getItems("Module", {
          objectID: module?.id,
        });

        for (const lesson of module?.lessons || []) {
          await insertOrIgnore("Lesson", {
            objectID: lesson?.id,
            module_object_id: module?.id,
            module_id: getModuleDB?.id,
            title: lesson?.title,
            description: lesson?.description,
          });
          const getLessonDB = await getItems("Lesson", {
            objectID: lesson?.id,
          });

          for (const content of lesson?.content || []) {
            await insertOrIgnore("Content", {
              objectID: content?.id,
              lesson_object_id: lesson?.id,
              lesson_id: getLessonDB?.id,
              topic: content?.topic,
            });
            const getContentDB = await getItems("Content", {
              objectID: content?.id,
            });

            for (const component of content?.component || []) {
              await insertOrIgnore("Component", {
                objectID: component?.id,
                content_object_id: content?.id,
                content_id: getContentDB?.id,
                name: component?.name,
                definition: component?.definition,
                image: "",
                video: "",
              });

              await insertOrIgnore("ForDownloads", {
                objectID: component?.id,
                type: "image",
                file: component?.image,
              });

              await insertOrIgnore("ForDownloads", {
                objectID: component?.id,
                type: "video",
                file: component?.video,
              });
            }
          }
        }
      }
      onBoardingDone("allSet.txt", "true");
      dispatch(setCompletedSetup(true));
      setRendering(false);
      navigation.navigate("DrawerRoutes");
    } catch (error) {
      setRendering(false);
      console.log(error);
      setError("accessCode", {
        type: "manual",
        message: error?.data?.message,
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
        name={"accessCode"}
        placeholder="Enter Code"
        error={Boolean(errors?.accessCode)}
        helperText={errors?.accessCode?.message}
        // endIcon={watch("accessCode") && "arrow-right"}
        onPress={handleSubmit(submitHandler)}
        onSubmitEditing={handleSubmit(submitHandler)}
        // onSubmitEditing={() => dumpTable("Subject")}
      />

      <Loading open={loadingSubject || rendering} />
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
