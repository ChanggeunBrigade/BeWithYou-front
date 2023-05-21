/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import notifee, {EventType} from '@notifee/react-native';
import {name as appName} from './app.json';
import EmergencyAlarm from './components/EmergencyAlarm';
import Home from './components/home';
import EmergencyAlarmNoti from './components/EmergencyAlarmNoti';
import {DeviceEventEmitter} from 'react-native';

DeviceEventEmitter.addListener('mqttBackgroundTask', () => {});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'emergency-alarm') {
    // Update external API
    AppRegistry.registerComponent('emergency-alarm', () => EmergencyAlarmNoti);

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'emergency-alarm') {
    // Update external API
    AppRegistry.registerComponent('emergency-alarm', () => EmergencyAlarmNoti);

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
