import { Animated, StyleSheet } from 'react-native'
import React, { useRef } from 'react'

const useValue = (defaultValue = 0) => {
    const animatedValue = useRef(new Animated.Value(defaultValue)).current
    return {
        value: animatedValue
    }
}

export default useValue

const styles = StyleSheet.create({})