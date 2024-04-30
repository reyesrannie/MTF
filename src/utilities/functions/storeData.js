import * as FileSystem from "expo-file-system";

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

export { onBoardingDone, readFile, setupComplete, readUser, updateFile };
