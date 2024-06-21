import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const Timing = () => {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withTiming(width.value + 50)
  };
  return (
    <View>
      <Text>Timing</Text>
      <Animated.View
        style={{
          width: width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} title="Click me" />
    </View>
  )
}

export default Timing

const styles = StyleSheet.create({})