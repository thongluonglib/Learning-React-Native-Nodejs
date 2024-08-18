import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearTextGradient from 'react-native-linear-gradient'
const GradientText = () => {
    return (
        <LinearTextGradient
            style={{ fontWeight: 'bold', fontSize: 72 }}
            locations={[0, 1]}
            colors={['red', 'blue']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            THIS IS TEXT GRADIENT
        </LinearTextGradient>
    )
}

export default GradientText

const styles = StyleSheet.create({})