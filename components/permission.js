import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { ColorSchemeContext } from "../App";
import { useContext } from "react";

export default function Permission({ navigation }) {
  const colorScheme = useContext(ColorSchemeContext);

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

        <View style={styles.section}>
          <Text
            style={[
              {
                ...styles.boldText,
                fontSize: 23,
                marginTop: 40,
                marginBottom: 5,
              },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            앱 사용을 위해 권한을 허락해주세요
          </Text>
          <Text
            style={[
              {
                ...styles.boldText,
                fontSize: 23,
                marginBottom: 20,
              },
              colorScheme === "dark"
                ? styles.darkMainText
                : styles.lightMainText,
            ]}
          >
            꼭 필요한 권한만 받아요
          </Text>
        </View>

        <View style={styles.section2}>
          <View style={styles.permissionIcon}>
            <MaterialIcons name="message" size={30} color={"#ffffff"} />
          </View>
          <View style={{ flexShrink: 1, marginRight: 40 }}>
            <Text
              style={[
                {
                  ...styles.semiBoldText,
                  fontSize: 18,
                  marginBottom: 5,
                },
                colorScheme === "dark"
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              SMS 발송
            </Text>
            <Text
              style={[
                {
                  ...styles.Text,
                  fontSize: 12,
                },
                colorScheme === "dark"
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              일정시간 휴대전화의 사용이 없을 시 저장된 긴급 구호자에게로 문자를
              보내기 위해 요구되는 권한이에요.
            </Text>
          </View>
        </View>

        <View style={styles.section2}>
          <View style={styles.permissionIcon}>
            <MaterialIcons name="my-location" size={30} color={"#ffffff"} />
          </View>
          <View style={{ flexShrink: 1, marginRight: 40 }}>
            <Text
              style={[
                {
                  ...styles.semiBoldText,
                  fontSize: 18,
                  marginBottom: 5,
                },
                colorScheme === "dark"
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              위치 정보
            </Text>
            <Text
              style={[
                {
                  ...styles.Text,
                  fontSize: 12,
                },
                colorScheme === "dark"
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              일정시간 휴대전화의 사용이 없을 시 저장된 긴급 구호자에게로 현재
              위치를 보내기 위해 요구되는 권한이에요.
            </Text>
          </View>
        </View>

        <View style={styles.section2}>
          <View style={styles.permissionIcon}>
            <MaterialIcons name="do-not-disturb" size={30} color={"#ffffff"} />
          </View>
          <View style={{ flexShrink: 1, marginRight: 30 }}>
            <Text
              style={[
                {
                  ...styles.semiBoldText,
                  fontSize: 18,
                  marginBottom: 5,
                },
                colorScheme === "dark"
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              방해금지 권한 (권장하지 않아요)
            </Text>
            <Text
              style={[
                {
                  ...styles.Text,
                  fontSize: 12,
                },
                colorScheme === "dark"
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              외부에서 업무나 개인사정으로 인하여 일정시간 이상 휴대전화의
              사용이 없을 시에도 알림이 울리는 것을 방지하기 위한 기능이에요.
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.push("userRegisterName")}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "PretendardMedium",
                fontSize: 18,
              }}
            >
              알겠어요
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
  button: {
    height: 60,
    marginBottom: 20,
    marginTop: 30,
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
  section: {
    marginTop: 15,
    marginBottom: 20,
    paddingVertical: 8,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  section2: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 0,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  permissionIcon: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "#b6b6c0",
    paddingVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  darkIcon: {
    backgroundColor: "#b6b6c0",
  },
  lightIcon: {
    backgroundColor: "#f1f3f8",
  },
  Text: {
    fontFamily: "PretendardMedium",
    fontSize: 23,
    letterSpacing: -0.4,
    lineHeight: 19,
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
  semiBoldText: {
    fontFamily: "PretendardSemiBold",
    fontSize: 17,
    letterSpacing: -0.4,
    paddingTop: 2,
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
});
