import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import * as Font from "expo-font";
import { ColorSchemeContext } from "../App";
import { useContext, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import Checked from "./animations/checked";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CompleteRegister({ navigation }) {
  const colorScheme = useContext(ColorSchemeContext);
  const routesParams = useRoute();
  let isCompleteReg = false;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (routesParams.name === "completeRegister") {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const completeReg = async () => {
    try {
      const userInfoData = await AsyncStorage.getItem("userInfoData");
      // AsyncStorage에서 'userInfoData' 키로 저장된 값을 가져옵니다.
      let userData = userInfoData ? JSON.parse(userInfoData) : {};
      // 가져온 데이터를 JSON.parse를 통해 객체로 변환합니다. 데이터가 없으면 빈 객체를 생성합니다.
      if (userData) {
        console.log("Data 로딩 성공");
      }
      userData.userInfo.completeRegister = isCompleteReg;
      // userInfo 객체 안에 있는 name 속성에 name 상태 변수 값을 저장합니다.
      await AsyncStorage.setItem("userInfoData", JSON.stringify(userData));
      // userInfo 객체를 JSON.stringify를 사용하여 문자열로 변환하고, 'userInfoData' 키로 AsyncStorage에 저장합니다.
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          colorScheme === "dark" ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <StatusBar style="auto" />

        <View style={{ ...styles.section2, marginTop: 100 }}>
          <Checked></Checked>
          <Text
            style={[
              { ...styles.boldText, fontSize: 23, marginBottom: 5 },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            입력해주신 정보가
          </Text>
          <Text
            style={[
              { ...styles.boldText, fontSize: 23 },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            정상적으로 등록되었어요
          </Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              isCompleteReg = true;
              completeReg();
              navigation.popToTop();
              navigation.push("Home");
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
              확인
            </Text>
          </TouchableOpacity>
        </View>
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
  button: {
    height: 60,
    marginBottom: 20,
    backgroundColor: "#3182f7",
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "fff",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 45,
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
    paddingVertical: 8,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  section2: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    marginTop: 15,
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
