import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, {useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {PERMISSIONS, request} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import {manager} from './src/utils/BleManager';
const listPermission: any = Platform.select<
  typeof PERMISSIONS.ANDROID | typeof PERMISSIONS.IOS
>({
  android: PERMISSIONS.ANDROID,
  ios: PERMISSIONS.IOS,
});
function renderPermissionList() {
  return Object.values(listPermission)?.map((item: any) => (
    <View style={{marginTop: 10}}>
      <Button
        title={item.toString()}
        onPress={() => {
          request(item).then(result => {
            console.log('item', result);
          });
        }}
      />
    </View>
  ));
}

const App = () => {
  const {type, isConnected, details} = useNetInfo();
  console.log('details:  ', JSON.stringify(details, null, 2));
  console.log('isConnected', JSON.stringify(isConnected, null, 2));
  function scanAndConnect() {
    manager.startDeviceScan(null, null, (error, device) => {
      console.log('device', JSON.stringify(device, null, 2));
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();

        // Proceed with connection.
      }
    });
  }
  useEffect(() => {
    scanAndConnect();
    // WifiManager.getCurrentWifiSSID().then(
    //   ssid => {
    //     console.log('Your current connected wifi SSID is ' + ssid);
    //   },
    //   () => {
    //     console.log('Cannot get current SSID!');
    //   },
    // );
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text>App</Text>
      <Text>Network Type: {type}</Text>
      <Text>isConnected: {String(isConnected)}</Text>

      <Button
        title="Request Localtion"
        onPress={() => {
          console.log('result');
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
            title: 'Title',
            message: 'Message',
            buttonPositive: 'buttonPositive',
            buttonNegative: 'buttonNegative',
            buttonNeutral: 'buttonNeutral',
          }).then(result => {
            console.log('result: ', JSON.stringify(result, null, 2));
          });
        }}
      />
      <Button
        title="Check Wifi State"
        onPress={() => {
          console.log('isConnected', JSON.stringify(isConnected, null, 2));
        }}
      />
      <Button
        title="Request BLUETOOTH_SCAN"
        onPress={async () => {
          const granted = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
          console.log('BLUETOOTH_SCAN', JSON.stringify(granted, null, 2));
        }}
      />
      <Button
        title="Request BLUETOOTH_CONNECT"
        onPress={async () => {
          const granted = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
          console.log('BLUETOOTH_CONNECT', JSON.stringify(granted, null, 2));
        }}
      />
      <Button
        title="Ble Start"
        onPress={() => {
          BleManager.start({showAlert: false}).then(result => {
            // Success code
            console.log('Module initialized', result);
          });
        }}
      />
      <Button
        title="Scan Ble"
        onPress={() => {
          BleManager.scan([], 5, true).then(result => {
            // Success code
            console.log('Scan started', result);
          });
        }}
      />
      <Button
        title="getBondedPeripherals"
        onPress={() => {
          BleManager.getBondedPeripherals([]).then(results => {
            if (results.length === 0) {
              console.log('No connected bluetooth devices');
            } else {
              // for (let i = 0; i < results.length; i++) {
              //   let peripheral = results[i];
              //   peripheral.connected = true;
              //   peripherals.set(peripheral.id, peripheral);
              //   console.log('peripherals', JSON.stringify(peripherals, null, 2))
              // }
            }
          });
        }}
      />
      <ScrollView>{/* {renderPermissionList()} */}</ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
