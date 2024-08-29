import { Animated, ViewStyle } from 'react-native'
import React from 'react'
import useValue from './useValue'
import useValueXY from './useValueXY'
interface IProps {
    duration?: number
    defaultValue?: { x: number, y: number }
}
interface IValue {
    x?: number
    y?: number
}
interface IConfig {
    duration?: number
}
const useTransition = ({ duration, defaultValue = { x: 0, y: 0 } }: IProps) => {
    const { value: animatedValue } = useValueXY(defaultValue)


    const startAnimation = (toValue: IValue, config: IConfig, compelete: () => void) => {
        Animated.timing(animatedValue, {
            toValue: {
                x: toValue?.x,
                y: toValue?.y
            },
            duration: config?.duration || duration,
            useNativeDriver: true,
        }).start(() => {
            if (compelete) {
                compelete()
            }
        });
    };

    const animationStyle: ViewStyle = {
        transform: [
            { translateX: animatedValue.x },
            { translateY: animatedValue.y }
        ]
    }
    return {
        animatedValue,
        animationStyle,
        startAnimation,
    }
}

export default useTransition
