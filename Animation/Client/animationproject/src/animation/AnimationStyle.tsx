import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimationStyle = () => {
    const width = useSharedValue(100);
    const viewStyle = useAnimatedStyle(() => ({
        width: width.value,
        height: 100,
        backgroundColor: 'violet',
    }))
    const handlePress = () => {
        width.value = withTiming(width.value + 50)
    };
    return (
        <View>
            <Text>AnimationStyle</Text>
            <Animated.View
                style={viewStyle}
            />
            <Button onPress={handlePress} title="Click me" />
        </View>
    )
}

export default AnimationStyle

const styles = StyleSheet.create({})