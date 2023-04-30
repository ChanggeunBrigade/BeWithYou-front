import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import * as Font from "expo-font";
import { lightTheme } from "../color";
import { Ionicons } from "@expo/vector-icons";
import ContactItem from "./contactItem";
import { ColorSchemeContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export default function Contact({ navigation }) {
  const colorScheme = useContext(ColorSchemeContext);
  const [contact, setContact] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = async () => {
        if (routesParams.name === "Contact") {
          const contactData = await AsyncStorage.getItem("contact");
          setContact(JSON.parse(contactData));
        } else {
          return false;
        }
      };

      return async () => {
        const contactData = await AsyncStorage.getItem("contact");
        setContact(JSON.parse(contactData));
      };
    }, [])
  );

  const LoadContact = async () => {
    try {
      const contactData = await AsyncStorage.getItem("contact");
      setContact(JSON.parse(contactData));

      // userInfo 객체 안에 있는 name 속성에 name 상태 변수 값을 저장합니다.
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadContact();
  }, [contact]);

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
    <ScrollView
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={27}
          style={
            colorScheme === "dark" ? styles.darkMainText : styles.lightMainText
          }
        />
      </TouchableOpacity>

      <View style={styles.Profile}>
        <View>
          <Text
            style={[
              { ...styles.boldText, fontSize: 23 },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            구호자 연락처 관리
          </Text>
          <Text
            style={[
              {
                ...styles.subText,
                fontSize: 13,
                marginLeft: 5,
                marginRight: 10,
                marginTop: 10,
                lineHeight: 20,
              },
              colorScheme === "dark" ? styles.darkSubText : styles.lightSubText,
            ]}
          >
            여기서 비상구호자들의 연락처를 관리할 수 있어요.
          </Text>
          <Text
            style={[
              {
                ...styles.subText,
                fontSize: 13,
                marginLeft: 5,
                marginRight: 10,
                lineHeight: 20,
              },
              colorScheme === "dark" ? styles.darkSubText : styles.lightSubText,
            ]}
          >
            구호자의 연락처를 클릭하면 정보를 수정하거나 삭제할 수 있어요.
          </Text>
        </View>
      </View>

      {Object.keys(contact).map(([key]) =>
        key ? (
          <ContactItem
            key={key}
            id={Object.keys(contact).slice(0)[key - 1]}
            name={contact[key].SaverName}
            phNum={contact[key].phNum}
          />
        ) : (
          <View></View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  greySpace: {
    height: 25,
    paddingHorizontal: 20,
    backgroundColor: lightTheme.sectionBackground,
  },
  buttonTab: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "fff",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
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
  profileName: {
    flex: 1,
  },
  tinyButton: {
    backgroundColor: "#f1f3f8",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginTop: 5,
  },
  section: {
    marginTop: 15,
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 22,
    marginHorizontal: 25,
    borderRadius: 15,
    backgroundColor: "#f1f3f8",
    flexDirection: "row",
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
    fontFamily: "PretendardMedium",
    fontSize: 10,
    color: "#6a7684",
    letterSpacing: -0.2,
    paddingBottom: 2,
  },
  profileImage: {
    height: 60,
    width: 60,
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
