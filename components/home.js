import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import * as Font from 'expo-font';
import {lightTheme} from '../color';

import {ColorSchemeContext} from '../App';
import {useContext, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import * as React from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {useEvent} from 'react-native-reanimated';

export default function Home({navigation}) {
  const routesParams = useRoute();
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      LoadUser();
      getLocation();
      const onBackPress = () => {
        if (routesParams.name === 'Home') {
          if (this.exitApp === undefined || !this.exitApp) {
            ToastAndroid.show(
              '한번 더 누르시면 앱을 종료합니다.',
              ToastAndroid.SHORT,
            );
            this.exitApp = true;

            this.timeout = setTimeout(
              () => {
                this.exitApp = false;
              },
              2000, // 2초
            );
          } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp(); // 앱 종료
          }
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [routesParams.name, text, name, number, address]),
  );

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
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
    } catch (error) {
      console.log(error);
    }
  };

  const colorScheme = useContext(ColorSchemeContext);

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

  let phoneNumbers = {
    addressList: ['01042018745'],
  };

  const sendSms = () => {
    SmsAndroid.autoSend(
      JSON.stringify(phoneNumbers),
      '[함께할게 테스트메시지]\n\n' +
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

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer,
      ]}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.push('EmergencyAlarm')}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.mainLogoText,
              colorScheme === 'dark'
                ? styles.darkMainText
                : styles.lightMainText,
            ]}>
            함께할게.
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.section,
          colorScheme === 'dark' ? styles.darkSectionBg : styles.lightSectionBg,
        ]}>
        <TouchableOpacity
          onPress={() => navigation.push('RegisterSaver')}
          activeOpacity={0.6}
          style={[
            styles.mainButton,
            colorScheme === 'dark'
              ? styles.darkContainer
              : styles.lightContainer,
          ]}>
          <Text style={styles.subText}>구호자</Text>
          <Text
            style={[
              styles.Text,
              colorScheme === 'dark'
                ? styles.darkMainText
                : styles.lightMainText,
            ]}>
            연락처 등록
          </Text>
          <Image
            style={styles.tinyImage}
            source={require('../assets/img/home/contact.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push('Contact')}
          activeOpacity={0.6}
          style={[
            styles.mainButton,
            colorScheme === 'dark'
              ? styles.darkContainer
              : styles.lightContainer,
          ]}>
          <Text style={styles.subText}>구호자</Text>
          <Text
            style={[
              styles.Text,
              colorScheme === 'dark'
                ? styles.darkMainText
                : styles.lightMainText,
            ]}>
            연락처 관리
          </Text>
          <Image
            style={{...styles.tinyImage, marginTop: 32}}
            source={require('../assets/img/home/contact_config.png')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.section,
          colorScheme === 'dark' ? styles.darkSectionBg : styles.lightSectionBg,
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            ToastAndroid.show('현재 앱은 최신 버전입니다.', ToastAndroid.SHORT);
          }}
          style={[
            styles.mainButton,
            colorScheme === 'dark'
              ? styles.darkContainer
              : styles.lightContainer,
          ]}>
          <Text style={styles.subText}>최신 버전으로</Text>
          <Text
            style={[
              styles.Text,
              colorScheme === 'dark'
                ? styles.darkMainText
                : styles.lightMainText,
            ]}>
            업데이트
          </Text>
          <Image
            style={styles.tinyImage}
            source={require('../assets/img/home/update.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push('Setting', {})}
          activeOpacity={0.6}
          style={[
            styles.mainButton,
            colorScheme === 'dark'
              ? styles.darkContainer
              : styles.lightContainer,
          ]}>
          <Text style={styles.subText}>쉽고 빠른</Text>
          <Text
            style={[
              styles.Text,
              colorScheme === 'dark'
                ? styles.darkMainText
                : styles.lightMainText,
            ]}>
            환경설정
          </Text>
          <Image
            style={styles.tinyImage}
            source={require('../assets/img/home/setting.png')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.section2,
          colorScheme === 'dark' ? styles.darkSectionBg : styles.lightSectionBg,
        ]}>
        <TouchableOpacity
          onPress={sendSms}
          activeOpacity={0.8}
          style={styles.mainTestButton}>
          <Text style={{...styles.Text2}}>테스트 문자 발송</Text>
          <Text style={{...styles.subText2}}>
            대표 구호자 연락처로 테스트 문자를 발송합니다.
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.footer,
          colorScheme === 'dark' ? styles.darkSectionBg : styles.lightSectionBg,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1f1d24',
  },

  header: {
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 20,
  },

  section: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  section2: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footer: {
    paddingTop: 20,
    flex: 6.5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lightSectionBg: {
    backgroundColor: '#f4f4f4',
  },
  darkSectionBg: {
    backgroundColor: '#101012',
  },

  tinyImage: {
    width: 40,
    height: 40,
    marginTop: 30,
  },

  mainButton: {
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 22,
    paddingTop: 20,
    fontFamily: 'PretendardSemiBold',
    backgroundColor: lightTheme.bgColor,
    flex: 2,
  },

  mainTestButton: {
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 22,
    paddingTop: 20,
    fontFamily: 'PretendardSemiBold',
    backgroundColor: '#5081F3',
    flex: 2,
    justifyContent: 'center',
  },

  Text: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 18,
    letterSpacing: -0.4,
    paddingTop: 2,
  },
  Text2: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 18,
    letterSpacing: -0.4,
    paddingTop: 2,
    color: '#ffffff',
  },
  lightMainText: {
    color: '#343d4c',
  },
  darkMainText: {
    color: '#ffffff',
  },

  subText: {
    fontFamily: 'PretendardMedium',
    fontSize: 13,
    color: lightTheme.subTextColor,
    letterSpacing: -0.4,
    paddingBottom: 2,
  },
  subText2: {
    fontFamily: 'PretendardMedium',
    fontSize: 13,
    color: '#ffffff',
    letterSpacing: -0.3,
    paddingBottom: 2,
    marginTop: 5,
  },

  mainLogoText: {
    fontFamily: 'Malang',
    fontSize: 25,
    letterSpacing: -1,
  },
  lightSubText: {
    color: '#343d4c',
  },
  darkSubText: {
    color: '#9d9ca2',
  },

  Icon: {
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
  },
});
