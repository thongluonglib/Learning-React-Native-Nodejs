import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const AnimationInterpolate = () => {
    const shareX = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
            {
                translateX: shareX.value
            }
        ],
        opacity: interpolate(shareX.value, [0, 300], [1, 0], Extrapolation.IDENTITY),
    }));
    const handlePress = () => {
        shareX.value = withTiming(shareX.value + 300, {
            duration: 3000
        })
    };
    return (
        <View>
            <Text>AnimationInterpolate</Text>
            <Animated.View style={animatedStyle} />
            <Button onPress={handlePress} title="Click me" />
        </View>
    )
}

export default AnimationInterpolate

const styles = StyleSheet.create({})