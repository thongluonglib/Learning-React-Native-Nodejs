import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);
const dirs = RNFetchBlob.fs.dirs;
const path = Platform.select({
  ios: 'hello.m4a',
  android: `${dirs.CacheDir}/hello.mp3`,
});
const RecordPlayer = () => {
  const [record, setRecord] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecord(prev => ({
        ...prev,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      }));
      return;
    });
    console.log(result);
  };
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    record.recordSecs = 0;
    setRecord({...record, recordSecs: 0, recordTime: 0});
    console.log(result);
  };
  const onPauseRecord = async () => {
    await audioRecorderPlayer.pauseRecorder();
  };
  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };
  console.log('Record', record);
  return (
    <View>
      <Text>RecordPlayer</Text>
      <Text>Time {record.recordTime}</Text>

      <Button title="Start Record" onPress={onStartRecord} />
      <Button title="Pause Record" onPress={onPauseRecord} />
      <Button title="Resume Record" onPress={onResumeRecord} />
      <Button title="Stop Record" onPress={onStopRecord} />
    </View>
  );
};

export default RecordPlayer;
