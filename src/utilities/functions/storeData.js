import * as FileSystem from "expo-file-system";
import { setUpdateDownloadProgress } from "../redux/slice/dataSlice";

const BASE_URL = process.env.EXPO_PUBLIC_Base_URL;

const onBoardingDone = async (filename, content) => {
  try {
    const appPath = FileSystem.documentDirectory;
    const filePath = `${appPath}${filename}`;

    await FileSystem.writeAsStringAsync(filePath, content);
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
};

const readFile = async (filename) => {
  try {
    const appPath = FileSystem.documentDirectory;
    const filePath = `${appPath}${filename}`;
    const fileContent = await FileSystem.readAsStringAsync(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const setupComplete = async (filename, content) => {
  try {
    const appPath = FileSystem.documentDirectory;
    const filePath = `${appPath}${filename}`;

    const contentString = JSON.stringify(content);
    await FileSystem.writeAsStringAsync(filePath, contentString);
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
};

const updateFile = async (filename, content) => {
  try {
    const appPath = FileSystem.documentDirectory;
    const filePath = `${appPath}${filename}`;

    const contentString = JSON.stringify(content);
    await FileSystem.writeAsStringAsync(filePath, contentString, {
      append: true,
    });
  } catch (error) {
    console.error(`Error updating file: ${error}`);
  }
};

const readUser = async (filename) => {
  try {
    const appPath = FileSystem.documentDirectory;
    const filePath = `${appPath}${filename}`;
    const fileContent = await FileSystem.readAsStringAsync(filePath);

    return fileContent;
  } catch (error) {
    return null;
  }
};

const downloadFile = async (filePath) => {
  console.log("Download started:", new Date().toISOString());
  if (!filePath) return null;
  const url = `${BASE_URL}${filePath}`;
  const fileName = filePath.split("/").pop();
  const localUri = `${FileSystem.documentDirectory}${fileName}`;

  try {
    console.log("Save started:", new Date().toISOString());
    const { uri } = await FileSystem.downloadAsync(url, localUri);
    console.log("fFinished:", new Date().toISOString());
    return uri;
  } catch (error) {
    console.error("File download error:", error);
    return null;
  }
};

const downloadFileWithProgress = async (dispatch, filePath, componentID) => {
  if (!filePath) return null;

  const url = `${BASE_URL}${filePath}`;
  const fileName = filePath.split("/").pop();
  const localUri = `${FileSystem.documentDirectory}${fileName}`;

  try {
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      localUri,
      {},
      ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        const progress = totalBytesWritten / totalBytesExpectedToWrite;
        dispatch(setUpdateDownloadProgress({ componentID, progress }));
      }
    );

    const { uri } = await downloadResumable.downloadAsync();
    return uri;
  } catch (error) {
    console.error("File download error:", error);
    return null;
  }
};

const asyncPool = async (poolLimit, array, iteratorFn) => {
  const executing = [];
  const results = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    results.push(p);
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);
    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
};

export {
  onBoardingDone,
  readFile,
  setupComplete,
  readUser,
  updateFile,
  downloadFile,
  downloadFileWithProgress,
  asyncPool,
};
