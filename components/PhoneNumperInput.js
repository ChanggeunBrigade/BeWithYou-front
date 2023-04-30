import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Appearance,
} from "react-native";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { ColorSchemeContext } from "../App";
import { useContext } from "react";

export default function PhoneNumberInput(props) {
  const colorScheme = useContext(ColorSchemeContext);

  const [focus, setFocus] = useState(false);
  const [number, setNumber] = useState("");
  const [enable, setEnable] = useState(false);

  const handlePress = (number) => {
    const regex = /^[0-9\b -]{13}$/;
    if (regex.test(number)) {
      setEnable(true);
    }
    if (!regex.test(number)) {
      setEnable(false);
    }
  };

  useEffect(() => {
    if (number.length === 10) {
      setNumber(number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (number.length === 13) {
      setNumber(
        number.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [number]);

  const [loaded] = Font.useFonts({
    PretendardExtraBold: require("../assets/fonts/Pretendard-ExtraBold.ttf"),
    PretendardSemiBold: require("../assets/fonts/Pretendard-SemiBold.ttf"),
    PretendardRegular: require("../assets/fonts/Pretendard-Regular.ttf"),
    PretendardMedium: require("../assets/fonts/Pretendard-Medium.ttf"),
    PretendardBold: require("../assets/fonts/Pretendard-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <StatusBar style="auto" />
      <View>
        <Text
          style={
            focus
              ? styles.FocusFont
              : [
                  styles.BlurFont,
                  colorScheme === "dark"
                    ? styles.darkSubText
                    : styles.lightSubText,
                ]
          }
        >
          {props.label}
        </Text>
        <TextInput
          onChangeText={(text) => {
            handlePress(text);
            setNumber(text);
          }}
          value={number}
          keyboardType="number-pad"
          style={[
            focus ? styles.inputOnFocus : styles.inputOnBlur,
            colorScheme === "dark" ? styles.darkMainText : styles.lightMainText,
          ]}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        ></TextInput>
      </View>
      <View style={styles.section}>
        {enable ? (
          <TouchableOpacity activeOpacity={0.8} style={{ ...styles.button }}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "PretendardMedium",
                fontSize: 18,
              }}
            >
              다음
            </Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "column-reverse",
  },
  button: {
    flexDirection: "column-reverse",
    height: 60,
    backgroundColor: "#3182f7",
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  FocusFont: {
    fontFamily: "PretendardRegular",
    color: "#0090ff",
    letterSpacing: -0.2,
    paddingBottom: 2,
    fontSize: 13,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 30,
  },
  BlurFont: {
    fontFamily: "PretendardRegular",
    color: "#6a7684",
    letterSpacing: -0.2,
    paddingBottom: 2,
    fontSize: 13,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 30,
  },
  inputOnFocus: {
    fontFamily: "PretendardRegular",
    fontSize: 21,
    borderBottomColor: "#0090ff",
    borderBottomWidth: 2,
    height: 42,
    marginHorizontal: 5,
  },
  inputOnBlur: {
    fontFamily: "PretendardRegular",
    fontSize: 21,
    borderBottomColor: "#b6b6c0",
    borderBottomWidth: 1,
    height: 42,
    marginHorizontal: 5,
  },
  header: {
    backgroundColor: "fff",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 45,
    marginBottom: 20,
  },
  Profile: {
    backgroundColor: "fff",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
  },
  Text: {
    fontFamily: "PretendardMedium",
    fontSize: 23,
    letterSpacing: -0.4,
    marginLeft: 10,
    color: "#6a7684",
  },
  boldText: {
    fontFamily: "PretendardBold",
    fontSize: 17,
    letterSpacing: -0.4,
    paddingTop: 2,
    marginLeft: 5,
    color: "#343d4c",
  },
  subText: {
    fontFamily: "PretendardRegular",
    color: "#6a7684",
    letterSpacing: -0.2,
    paddingBottom: 2,
    fontSize: 13,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 50,
  },

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
});
