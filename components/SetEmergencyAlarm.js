import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Appearance,
  TextInput,
} from "react-native";
import * as Font from "expo-font";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { ColorSchemeContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SetEmergencyAlarm({ navigation }) {
  const colorScheme = useContext(ColorSchemeContext);

  const [number, setNumber] = useState("");
  const [enable, setEnable] = useState(false);
  const [focus, setFocus] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "3시간", value: 3 },
    { label: "4시간", value: 4 },
    { label: "5시간", value: 5 },
    { label: "6시간", value: 6 },
    { label: "7시간", value: 7 },
    { label: "8시간", value: 8 },
    { label: "9시간", value: 9 },
    { label: "10시간", value: 10 },
    { label: "11시간", value: 11 },
    { label: "12시간", value: 12 },
    { label: "13시간", value: 13 },
    { label: "14시간", value: 14 },
    { label: "15시간", value: 15 },
    { label: "16시간", value: 16 },
  ]);

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

  const ModifySetting = async () => {
    try {
      const userSettingData = await AsyncStorage.getItem("userSettingData");
      let userSetting = userSettingData ? JSON.parse(userSettingData) : {};
      // 가져온 데이터를 JSON.parse를 통해 객체로 변환합니다. 데이터가 없으면 빈 객체를 생성합니다.

      userSetting.emergencyAlarmTime = value;
      await AsyncStorage.setItem(
        "userSettingData",
        JSON.stringify(userSetting)
      );

      console.log(userSetting);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          colorScheme === "dark" ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <StatusBar style="auto" />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header}
        >
          <Ionicons
            name="arrow-back-outline"
            size={27}
            style={[
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text
            style={[
              {
                ...styles.boldText,
                fontSize: 23,
                marginTop: 20,
                marginBottom: 0,
              },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            설정할 비상알람 시간 길이를
          </Text>
          <Text
            style={[
              {
                ...styles.boldText,
                fontSize: 23,
                marginTop: 5,
                marginBottom: 20,
              },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            선택해주세요
          </Text>
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
            시간
          </Text>

          <DropDownPicker
            listMode="MODAL"
            theme={colorScheme === "dark" ? "DARK" : "LIGHT"}
            placeholder="시간 설정..."
            open={open}
            value={value}
            onChangeValue={(value) => {
              console.log(value);
            }}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={colorScheme === "dark" ? styles.darkBtn : styles.lightBtn}
            textStyle={{
              fontFamily: "PretendardMedium",
              fontSize: 19,
              color: colorScheme === "dark" ? "#ffffff" : "#343d4c",
              paddingBottom: 0,
            }}
            dropDownContainerStyle={{
              backgroundColor: colorScheme === "dark" ? "#2c2c34" : "#f1f3f8",
              borderColor: colorScheme === "dark" ? "#2c2c34" : "#f1f3f8",
            }}
            modalAnimationType="slide"
            modalContentContainerStyle={{
              backgroundColor: colorScheme === "dark" ? "#1f1d24" : "#ffffff",
              borderColor: colorScheme === "dark" ? "#1f1d24" : "#f1f3f8",
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            ModifySetting();
            navigation.pop();
          }}
          activeOpacity={0.8}
          style={{ ...styles.button }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "PretendardMedium",
              fontSize: 18,
            }}
          >
            설정 완료
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
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
    paddingVertical: 10,
  },
  inputOnBlur: {
    fontFamily: "PretendardRegular",
    fontSize: 21,
    borderBottomColor: "#b6b6c0",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  button: {
    height: 60,
    marginBottom: 20,
    backgroundColor: "#3182f7",
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "fff",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 45,
    marginBottom: 0,
  },
  Profile: {
    backgroundColor: "fff",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
  },
  section: {
    flex: 1,
    marginTop: 0,
    paddingVertical: 8,
    marginHorizontal: 20,
    borderRadius: 15,
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
    fontSize: 10,
    color: "#6a7684",
    letterSpacing: -0.2,
    paddingBottom: 2,
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
    borderColor: "#f1f3f8",
    marginTop: 10,
    backgroundColor: "#f1f3f8",
  },
  darkBtn: {
    borderColor: "#2c2c34",
    marginTop: 10,
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
