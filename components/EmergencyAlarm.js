import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Font from 'expo-font';
import {useContext} from 'react';
import {ColorSchemeContext} from '../App';
import Svg, {Path, LinearGradient, Stop, Defs} from 'react-native-svg';
import {useCountdown} from 'react-native-countdown-circle-timer';
import * as React from 'react';

export default function EmergencyAlarm({navigation}) {
  const colorScheme = useContext(ColorSchemeContext);

  const duration = 60;

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({isPlaying: true, duration, colors: 'url(#your-unique-id)'});

  const [loaded] = Font.useFonts({
    Malang: require('../assets/fonts/MalangmalangB.ttf'),
    PretendardExtraBold: require('../assets/fonts/Pretendard-ExtraBold.ttf'),
    PretendardSemiBold: require('../assets/fonts/Pretendard-SemiBold.ttf'),
    PretendardRegular: require('../assets/fonts/Pretendard-Regular.ttf'),
    PretendardMedium: require('../assets/fonts/Pretendard-Medium.ttf'),
    PretendardBold: require('../assets/fonts/Pretendard-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer,
        ]}>
        <StatusBar style="auto" />

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: size,
              height: size,
              position: 'relative',
              marginTop: 120,
            }}>
            <Svg width={size} height={size}>
              <Defs>
                <LinearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
                  <Stop offset="0%" stopColor="#eb4828" />
                  <Stop offset="100%" stopColor="#eb4828" />
                </LinearGradient>
              </Defs>
              <Path
                d={path}
                fill="none"
                stroke={colorScheme === 'dark' ? '#2c2c34' : '#f1f3f8'}
                strokeWidth={strokeWidth}
              />
              {elapsedTime !== duration && (
                <Path
                  d={path}
                  fill="none"
                  stroke={stroke}
                  strokeLinecap="butt"
                  strokeWidth={strokeWidth}
                  strokeDasharray={pathLength}
                  strokeDashoffset={strokeDashoffset}
                />
              )}
            </Svg>
            <View style={styles.time}>
              <Text
                style={[
                  {...styles.boldText, fontSize: 55},
                  colorScheme === 'dark'
                    ? styles.darkMainText
                    : styles.lightMainText,
                ]}>
                {remainingTime}
              </Text>
            </View>
          </View>
        </View>

        <View style={{...styles.section2, marginTop: 50}}>
          <Text
            style={[
              {...styles.boldText, fontSize: 24, marginTop: 10},
              colorScheme === 'dark'
                ? styles.darkMainText
                : styles.lightMainText,
            ]}>
            충격이 감지되었어요!
          </Text>
          <Text
            style={[
              {
                ...styles.subText,
                fontSize: 13,
                marginLeft: 5,
                marginRight: 10,
                marginTop: 20,
                lineHeight: 20,
              },
              colorScheme === 'dark' ? styles.darkSubText : styles.lightSubText,
            ]}>
            60초 이내 알람끄기 버튼을 누르지 않으신다면
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
              colorScheme === 'dark' ? styles.darkSubText : styles.lightSubText,
            ]}>
            위험상황으로 간주하고 사전에 등록한 구호자들에게
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
              colorScheme === 'dark' ? styles.darkSubText : styles.lightSubText,
            ]}>
            현재 위치정보를 담은 긴급메시지를 송신할게요.
          </Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            activeOpacity={0.8}
            style={{...styles.button}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'PretendardMedium',
                fontSize: 18,
              }}>
              알람 끄기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  time: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  mainLogoText: {
    fontFamily: 'Malang',
    fontSize: 25,
    letterSpacing: -1,
  },
  FocusFont: {
    fontFamily: 'PretendardRegular',
    color: '#0090ff',
    letterSpacing: -0.2,
    paddingBottom: 2,
    fontSize: 13,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 30,
  },
  BlurFont: {
    fontFamily: 'PretendardRegular',
    color: '#6a7684',
    letterSpacing: -0.2,
    paddingBottom: 2,
    fontSize: 13,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 30,
  },
  inputOnFocus: {
    fontFamily: 'PretendardRegular',
    fontSize: 21,
    borderBottomColor: '#0090ff',
    borderBottomWidth: 2,
    height: 42,
    marginHorizontal: 5,
  },
  inputOnBlur: {
    fontFamily: 'PretendardRegular',
    fontSize: 21,
    borderBottomColor: '#b6b6c0',
    borderBottomWidth: 1,
    height: 42,
    marginHorizontal: 5,
  },
  button: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#3182f7',
    borderRadius: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 45,
  },
  Profile: {
    backgroundColor: 'fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
  },
  section: {
    direction: 'row',
    paddingVertical: 8,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  section2: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontFamily: 'PretendardMedium',
    fontSize: 23,
    letterSpacing: -0.4,
    marginLeft: 10,
    color: '#6a7684',
  },
  boldText: {
    fontFamily: 'PretendardBold',
    fontSize: 17,
    letterSpacing: -0.4,
    paddingTop: 2,
    color: '#343d4c',
  },
  subText: {
    fontFamily: 'PretendardMedium',
    fontSize: 10,
    color: '#6a7684',
    letterSpacing: -0.2,
    paddingBottom: 2,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1f1d24',
  },
  lightSectionBg: {
    backgroundColor: '#f4f4f4',
  },
  darkSectionBg: {
    backgroundColor: '#101012',
  },
  lightBtn: {
    backgroundColor: '#f1f3f8',
  },
  darkBtn: {
    backgroundColor: '#2c2c34',
  },
  lightMainText: {
    color: '#343d4c',
  },
  darkMainText: {
    color: '#ffffff',
  },
  lightSubText: {
    color: '#6a7684',
  },
  darkSubText: {
    color: '#c3c3c4',
  },
  lightTextInput: {
    color: '#000000',
  },
  darkTextInput: {
    color: '#ffffff',
  },
});
