import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  setCountryCode,
  setShowCountryCode,
} from "../../utilities/redux/slice/setupSlice";

const AppTextBox = ({
  placeholder,
  name,
  control,
  icon,
  endIcon,
  secureTextEntry,
  onPress,
  error,
  helperText,
  onSubmitEditing,
  reff,
  onFocus,
  mobile,
  selectValue,
  onBlur,
}) => {
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      marginBottom: 10,
    },
    textBoxContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      borderWidth: 1,
      borderColor: error ? "#ff4546" : "#6f65a1",
      width: "100%",
      borderRadius: 10,
      padding: 7,
      minHeight: 50,
      paddingLeft: 10,
    },
    icons: {
      marginRight: 10,
      color: "#6f65a1",
    },
    input: {
      minWidth: "80%",
    },
    code: {
      minWidth: 10,
    },
    errorMessage: {
      marginLeft: 10,
      fontFamily: "Roboto-Medium",
      fontSize: 12,
      color: "#ff4546",
    },
  });

  const formatValue = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, "");
    const parts = numericValue.match(/^(\d{0,3})(\d{0,3})(\d{0,100})$/);
    return parts ? `${parts[1]} ${parts[2]} ${parts[3]}`.trim() : "";
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { ref, value, onChange } = field;
        const handleChange = (e) => {
          const formattedValue = formatValue(e);
          onChange(formattedValue);
        };
        return (
          <View style={styles.container}>
            <View style={styles.textBoxContainer}>
              <MaterialCommunityIcons
                name={icon}
                size={24}
                style={styles.icons}
              />
              {mobile && (value || selectValue) && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    dispatch(setCountryCode(null));
                    dispatch(setShowCountryCode(true));
                  }}
                >
                  <Text> {selectValue}</Text>
                </TouchableWithoutFeedback>
              )}

              <TextInput
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                onChangeText={mobile ? handleChange : onChange}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={false}
                ref={reff}
                value={value}
                onFocus={onFocus}
                keyboardType={mobile ? "number-pad" : "default"}
                onBlur={onBlur}
              />

              <TouchableWithoutFeedback onPress={onPress}>
                <MaterialCommunityIcons
                  name={endIcon}
                  size={24}
                  style={styles.icons}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.errorMessage}>{helperText}</Text>
          </View>
        );
      }}
    />
  );
};
export default AppTextBox;
