import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
interface IProps {
    styleContainer?: ViewStyle,
    onPress?: Function
}
const GradientButton = ({ styleContainer, onPress }: IProps) => {
    function _onPress() {
        if (typeof onPress == 'function') onPress();
    }
    return (
        <View style={[styles.container, styleContainer]}>
            <LinearGradient
                colors={['#2DC0FF', '#0050FF']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 0.7, y: 1.0 }}
                style={styles.gradient}
            >
                <TouchableOpacity onPress={_onPress} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        Tìm kiếm
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default GradientButton

const styles = StyleSheet.create({
    container: {
    },
    gradient: {
        height: 36,
        width: 84,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8
    },
    buttonContainer: {
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700'
    }
})