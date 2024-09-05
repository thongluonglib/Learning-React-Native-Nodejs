``` bash  
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonFeedBack from './@components/Button/ButtonFeedback';
import usePrevious from './@hooks/usePrevProps';
import withLoadingPage from './@hoc/withLoadingPage';
import useKeyChain from './@hooks/useKeyChain';

const App = props => {
  let [count, setCount] = useState(0);
  const prevCount = usePrevious(count); //  Will
  console.log('props', props);
  useEffect(
    () => {
      console.log('ComponentDidUpdate', count);
    } /*ComponentDidUpdate */,
  );

  useEffect(
    () => {
      console.log('ComponentDidUnmount');
      return () => {
        /*ComponentDidUnmount */
      };
    },
    [] /*ComponentDidMount */,
  );
  const {
    isBiometrySupported,
    getKeyChain,
    setKeyChain,
    getSupportedBiometryType,
  } = useKeyChain();
  console.log('Render', isBiometrySupported);

  return (
    <View>
      <Text>prevCount {prevCount}</Text>
      <Text>App {count}</Text>
      <ButtonFeedBack
        title={'setKeyChain'}
        buttonProps={{
          onPress: async () => {
            await setKeyChain('usename1', 'Password1');
          },
        }}
      />
      <ButtonFeedBack
        title={'getKeyChain'}
        buttonProps={{
          onPress: async () => {
            setCount(count + 1);
            await getKeyChain();
          },
        }}
      />
      <ButtonFeedBack
        title={'getSupportedBiometryType'}
        defaultLoading={true}
        buttonProps={{
          onPress: async (setLoading) => {
            setLoading(true)
            setCount(count + 1);
            // await setKeyChain("usename1", "Password1")
            await getSupportedBiometryType();
          },
        }}
      />
    </View>
  );
};

export default withLoadingPage(App);

const styles = StyleSheet.create({});
```