import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
const useKeyChain = () => {
  const [isBiometrySupported, setIsBiometrySupported] = useState();
  async function getSupportedBiometryType() {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      console.log('getSupportedBiometryType', biometryType);
      setIsBiometrySupported(!!biometryType)
      return !!biometryType;
    } catch (error) {
      console.log('Error checking biometry support:', error.message);
      return false;
    }
  }
  async function setKeyChain(key: String, value: any) {
    await Keychain.setGenericPassword(key, value);
  }

  async function getKeyChain() {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        console.log('Credentials successfully loaded for user ', credentials);
        return credentials;
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }
  async function resetKeyChain() {
    await Keychain.resetGenericPassword();
  }
  return {
    isBiometrySupported,
    setKeyChain,
    getKeyChain,
    resetKeyChain,
    getSupportedBiometryType
  };
};

export default useKeyChain;

const styles = StyleSheet.create({});
