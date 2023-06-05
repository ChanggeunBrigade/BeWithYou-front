import {StatusBar} from 'expo-status-bar';
import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  AppRegistry,
  Appearance,
} from 'react-native';
import * as Font from 'expo-font';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState, useRef} from 'react';
import {ColorSchemeContext} from '../App';
import Svg, {Path, LinearGradient, Stop, Defs} from 'react-native-svg';
import {
  CountdownCircleTimer,
  useCountdown,
} from 'react-native-countdown-circle-timer';
import * as React from 'react';

import SmsAndroid from 'react-native-get-sms-android';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Home from './home';
import Wave from './animations/wave';

export default function EmergencyAlarm({navigation, route}) {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const [backgroundColorAnim] = useState(new Animated.Value(0));
  const containerRef = useRef(null);

  const [phNum, setPhNum] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const twinkleFirst = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const twinkleLater = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  let elapsedTimes = route.params;

  // console.log(elapsedTimes.elapsedTime);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setColorScheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');

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
  } = useCountdown({
    isPlaying: true,
    duration,
    colors: 'url(#your-unique-id)',
  });

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const LoadUser = async () => {
    try {
      const userInfoData = await AsyncStorage.getItem('userInfoData');
      let userData = JSON.parse(userInfoData);

      const userSettingData = await AsyncStorage.getItem('userSettingData');
      let userSetting = JSON.parse(userSettingData);

      setText(userSetting.emergencyMessage);
      setName(userData.userInfo.name);
      setNumber(userData.userInfo.phNum);
      setAddress(userData.userInfo.Address);

      SplashScreen.hide();
    } catch (error) {
      console.log(error);
    }
  };

  const LoadContact = async () => {
    try {
      const contactData = await AsyncStorage.getItem('contact');
      let contact = contactData ? JSON.parse(contactData) : {};
      // 가져온 데이터를 JSON.parse를 통해 객체로 변환합니다. 데이터가 없으면 빈 객체를 생성합니다.
      if (Object.keys(contact).length === 0) {
        contact = contactReset;
      }
      console.log(contact);
      // userInfo 객체 안에 있는 name 속성에 name 상태 변수 값을 저장합니다.

      // phNum만 포함된 새로운 배열을 만듭니다.
      const phoneNumber = Object.values(contact).map((item) => item.phNum);
      setPhNum(phoneNumber);

      console.log(phNum);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
    LoadUser();
    LoadContact();
  }, []);

  let phoneNumbers = {
    addressList: phNum,
  };

  const sendSms = () => {
    SmsAndroid.autoSend(
      JSON.stringify(phoneNumbers),
      '[함께할게.]\n\n' +
        text +
        `\n\n현재 ${name} 님의 위치입니다. \n` +
        `https://www.google.com/maps/place/${location.coords.latitude},${location.coords.longitude}`,
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      success => {
        ToastAndroid.show('메시지를 발송 완료하였어요.', ToastAndroid.SHORT);
        console.log('SMS sent successfully');
      },
    );
  };

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
    <ColorSchemeContext.Provider value={colorScheme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[
            styles.container,
            colorScheme === 'dark'
              ? styles.darkContainer
              : styles.lightContainer
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
              <CountdownCircleTimer
                onComplete={() => {
                  sendSms();
                  ToastAndroid.show(
                    '비상메시지를 구호자에게 송신했어요.',
                    ToastAndroid.SHORT,
                  );
                }}
                isPlaying
                duration={57}
                trailColor={colorScheme === 'dark' ? '#2c2c34' : '#f1f3f8'}
                colors={['#0090ff', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[60, 30, 10, 0]}>
                {({remainingTime, color}) => (
                  <Text
                    style={[
                      {...styles.boldText, fontSize: 55},
                      colorScheme === 'dark'
                        ? styles.darkMainText
                        : styles.lightMainText,
                    ]}>
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
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
                colorScheme === 'dark'
                  ? styles.darkSubText
                  : styles.lightSubText,
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
                colorScheme === 'dark'
                  ? styles.darkSubText
                  : styles.lightSubText,
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
                colorScheme === 'dark'
                  ? styles.darkSubText
                  : styles.lightSubText,
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
        </Animated.View>
      </TouchableWithoutFeedback>
    </ColorSchemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
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
  redcontainer: {
    backgroundColor: 'ff0000',
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
