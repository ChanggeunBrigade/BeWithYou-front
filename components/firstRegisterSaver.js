import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { ColorSchemeContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FirstRegisterSaver({ navigation }) {
  const colorScheme = useContext(ColorSchemeContext);

  const [numberFocus, setNumberFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [enable, setEnable] = useState(false);

  const onChangeName = (payload) => setName(payload);
  const onChangeNumber = (payload) => setNumber(payload);

  const handleAddContact = async () => {
    try {
      const contactData = await AsyncStorage.getItem("contact");
      let contact = contactData ? JSON.parse(contactData) : {};
      let idNum = Object.keys(contact).length + 1;

      let newSaver = {
        [idNum]: {
          SaverName: name,
          phNum: number,
        },
      };

      const mergedData = Object.assign({}, contact, newSaver);
      await AsyncStorage.setItem("contact", JSON.stringify(mergedData));
      console.log("새로운 연락처 추가 완료");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {
    if (name.length >= 3 && number.length >= 13) {
      setEnable(true);
    }
    if (number.length < 13 || name.length === 0) {
      setEnable(false);
    }
  };

  useEffect(() => {
    handlePress();
  }, [name, number]);

  useEffect(() => {
    if (number.length === 10) {
      setNumber(number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (number.length === 13) {
      setNumber(
        number.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
    handlePress();
  }, [number, name]);

  const contactReset = {};

  const LoadContact = async () => {
    try {
      const contactData = await AsyncStorage.getItem("contact");
      let contact = contactData ? JSON.parse(contactData) : {};
      // 가져온 데이터를 JSON.parse를 통해 객체로 변환합니다. 데이터가 없으면 빈 객체를 생성합니다.
      if (Object.keys(contact).length === 0) {
        contact = contactReset;
      }
      console.log(contact);
      // userInfo 객체 안에 있는 name 속성에 name 상태 변수 값을 저장합니다.
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadContact();
  }, []);

  const deleteContact = async () => {
    try {
      await AsyncStorage.removeItem("contact");
      console.log("삭제 완료");
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
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={[
            styles.header,
            colorScheme === "dark"
              ? styles.darkContainer
              : styles.lightContainer,
          ]}
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
              { ...styles.boldText, fontSize: 23 },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            구호자를 등록해주세요
          </Text>
          <View>
            <Text
              style={
                nameFocus
                  ? styles.FocusFont
                  : [
                      styles.BlurFont,
                      colorScheme === "dark"
                        ? styles.darkSubText
                        : styles.lightSubText,
                    ]
              }
            >
              이름
            </Text>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              style={
                nameFocus
                  ? [
                      styles.inputOnFocus,
                      colorScheme === "dark"
                        ? styles.darkTextInput
                        : styles.lightTextInput,
                    ]
                  : [
                      styles.inputOnBlur,
                      colorScheme === "dark"
                        ? styles.darkTextInput
                        : styles.lightTextInput,
                    ]
              }
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            ></TextInput>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={
              numberFocus
                ? styles.FocusFont
                : [
                    styles.BlurFont,
                    colorScheme === "dark"
                      ? styles.darkSubText
                      : styles.lightSubText,
                  ]
            }
          >
            연락처
          </Text>
          <TextInput
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="number-pad"
            style={
              numberFocus
                ? [
                    styles.inputOnFocus,
                    colorScheme === "dark"
                      ? styles.darkTextInput
                      : styles.lightTextInput,
                  ]
                : [
                    styles.inputOnBlur,
                    colorScheme === "dark"
                      ? styles.darkTextInput
                      : styles.lightTextInput,
                  ]
            }
            onFocus={() => setNumberFocus(true)}
            onBlur={() => setNumberFocus(false)}
          ></TextInput>
        </View>
        <View style={styles.section}>
          {enable ? (
            <TouchableOpacity
              onPress={() => {
                handleAddContact();
                navigation.push("CompleteRegister");
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
                등록
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
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
