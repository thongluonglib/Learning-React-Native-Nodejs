import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';
import '@react-native-firebase/messaging';

// Your secondary Firebase project credentials for Android...
const androidCredentials = {
  clientId: '',
  appId: '',
  apiKey: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
  projectId: '',
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: '',
  appId: '',
  apiKey: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
  projectId: '',
};

// Select the relevant credentials
const credentials: any = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});

const config = {
  name: 'SECONDARY_APP',
};

firebase.initializeApp(credentials, config);

async function requestUserPermission() {
  const authStatus = await firebase.messaging().requestPermission();
  const enabled =
    authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
async function registerAppWithFCM() {
  if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
    await firebase.messaging().registerDeviceForRemoteMessages();
    const fcmToken = await firebase.messaging().getToken();
    // save the token to the db
    console.log('fcmToken', fcmToken)
  }
 
 
}

export { firebase, requestUserPermission, registerAppWithFCM }
