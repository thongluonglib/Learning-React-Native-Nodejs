import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Sound from 'react-native-sound';
import useSound from '../hooks/useSound';
Sound.setCategory('Playback');

const RNSound = () => {
  const {preLoad, getCurrentTime, play} = useSound(
    'file:////data/user/0/com.nativerecord/cache/hello.mp3',
  );
  return (
    <View>
      <Button title="Start audio" onPress={play} />
      <Button title="getCurrentTime" onPress={getCurrentTime} />
    </View>
  );
};

export default RNSound;

const styles = StyleSheet.create({});
