import {AppRegistry} from 'react-native';
import MQTT from 'sp-react-native-mqtt';
import notifee, {AndroidImportance} from '@notifee/react-native';

const mqttBackgroundTask = async () => {
  try {
    const client = await MQTT.createClient({
      uri: 'mqtt://osm-oracle.kro.kr:7001',
      clientId: 'skuBeWithYou',
      user: 'chang',
    });

    client.on('closed', function () {
      console.log('mqtt.event.closed');
    });

    client.on('error', function (msg) {
      console.log('mqtt.event.error', msg);
    });

    client.on('message', async function (msg) {
      console.log('mqtt.event.message', msg);
      const channelId = await notifee.createChannel({
        id: 'emergency-alarm',
        name: 'Emergency Notifications',
        sound: 'siren',
        importance: AndroidImportance.HIGH,
      });

      // 알림 표시
      await notifee.displayNotification({
        title: '긴급 상황이 발생했어요!',
        body: '괜찮으신가요? 60초 이후에 긴급메시지가 발송됩니다.',
        android: {
          channelId,
          sound: 'siren',
          showChronometer: true,
          chronometerDirection: 'down',
          timestamp: Date.now() + 60000, // 5 minutes
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'emergency-alarm',
            mainComponent: 'emergency-alarm-noti',
          },
        },
      });
    });

    client.on('connect', function () {
      console.log('connected');
      client.subscribe('alert', 2);
      client.publish('alert', 'test', 2, false);
    });

    client.connect();
  } catch (err) {
    console.log(err);
  }
};

AppRegistry.registerHeadlessTask(
  'mqttBackgroundTask',
  () => mqttBackgroundTask,
);
