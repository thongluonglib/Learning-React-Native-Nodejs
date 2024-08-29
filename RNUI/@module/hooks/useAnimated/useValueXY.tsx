import { Animated, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
interface IProps {
    x?: number,
    y?: number
}
const useValueXY = ({ x = 0, y = 0 }: IProps) => {
    const animatedValue = useRef(new Animated.ValueXY({
        x: x,
        y: y
    })).current
    return {
        value: animatedValue
    }
}

export default useValueXY

const styles = StyleSheet.create({})