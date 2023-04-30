import { StyleSheet } from "react-native";

export const lightTheme = {
  bgColor: "#FFFFFF",
  btnColor: "#f1f3f8",
  sectionBgColor: "#f4f4f4",
  mainTextColor: "#343d4c",
  subTextColor: "#9f9ea4",
  textInputColor: "#000000",
};

export const darkTheme = {
  bgColor: "#1f1d24",
  btnColor: "#2c2c34",
  sectionBgColor: "#101012",
  mainTextColor: "#ffffff",
  subTextColor: "#c3c3c4",
  textInputColor: "#ffffff",
};

export const theme = {
  lightTheme,
  darkTheme,
};

export const ColorStyles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#1f1d24",
  },
  lightSectionBg: {
    backgroundColor: "#f4f4f4",
  },
  darkSectionBg: {
    backgroundColor: "#101012",
  },
  lightBtn: {
    backgroundColor: "#f1f3f8",
  },
  darkBtn: {
    backgroundColor: "#2c2c34",
  },
  lightMainText: {
    color: "#343d4c",
  },
  darkMainText: {
    color: "#ffffff",
  },
  lightSubText: {
    color: "#343d4c",
  },
  darkSubText: {
    color: "#c3c3c4",
  },
  lightTextInput: {
    color: "#000000",
  },
  darkTextInput: {
    color: "#ffffff",
  },
});
