import {StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const useSound = (url: String | 'whoosh.mp3') => {
  var whoosh: Sound = useRef().current;
  useEffect(() => {
    if (url) {
      preLoad(url);
    }
  }, []);

  function preLoad(url: String | 'whoosh.mp3') {
    whoosh = new Sound(url, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );
    });
  }

  function getCurrentTime() {
    whoosh.getCurrentTime(seconds => console.log('at ' + seconds));
  }

  function play() {
    //   Play the sound with an onEnd callback
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  function pause() {
    whoosh.pause();
  }
  function stop(isLoop?: Boolean) {
    // Stop the sound and rewind to the beginning
    whoosh.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      if (isLoop) {
        whoosh.play();
      }
    });
  }
  return {
    whoosh,
    preLoad,
    getCurrentTime,
    play,
    pause,
    stop,
  };
};

export default useSound;

const styles = StyleSheet.create({});
