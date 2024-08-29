import { Animated } from 'react-native'
import React from 'react'
import useValue from './useValue'
interface IProps {
    duration: number
    defaultValue: number
}
interface IConfig {
    config?: {
        duration?: number
    },
    compelete?: () => void
}
const useFade = ({ duration, defaultValue = 0 }: IProps) => {
    const { value: animatedValue } = useValue(defaultValue)
    const startAnimation = (toValue = 0, { config = {}, compelete }: IConfig) => {
        Animated.timing(animatedValue, {
            toValue: toValue || 1,
            duration: config?.duration || duration,
            useNativeDriver: true,
        }).start(() => {
            if (compelete) {
                compelete()
            }
        });
    };

    const animationStyle = {
        opacity: animatedValue
    }
    return {
        animatedValue,
        animationStyle,
        startAnimation,
    }
}

export default useFade
