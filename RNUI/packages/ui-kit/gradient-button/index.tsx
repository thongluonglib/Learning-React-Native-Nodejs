import {
    StyleSheet,
    Text,
    TextProps,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import React from 'react';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
interface IProps extends TouchableOpacityProps {
    linerGradientProps?: LinearGradientProps;
    textProps?: TextProps;
    title?: string;
}
const GradientButton = (props: IProps) => {
    const { title, linerGradientProps, textProps, ...restProps } = props;
    return (
        <TouchableOpacity {...restProps} style={[styles.buttonContainer, restProps?.style]}>
            <LinearGradient
                colors={['#2DC0FF', '#0050FF']}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 0.7, y: 1.0 }}
                {...linerGradientProps}
                style={[styles.gradient, linerGradientProps?.style]}
            >
                <Text {...textProps} style={[styles.buttonText, textProps?.style]}>
                    {title || 'Gradient Button'}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    gradient: {
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 12,
    },
    buttonContainer: {},
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
    },
});
