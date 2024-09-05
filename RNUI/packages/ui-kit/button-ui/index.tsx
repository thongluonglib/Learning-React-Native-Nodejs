import { StyleSheet, TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import TextUI from '../text-ui';
interface IProps extends TouchableOpacityProps {
    textProps?: TextProps;
    title?: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    children?: React.ReactNode;
}
const ButtonUI = (props: IProps) => {
    const { textProps, title, rightIcon, leftIcon, children, ...restProps } = props;
    return (
        <TouchableOpacity {...restProps} style={[styles.buttonContainer, restProps?.style]}>
            {leftIcon}
            {React.Children.count(children) > 0 ? (
                React.Children.map(children, child => {
                    if (typeof child === 'string') {
                        return (
                            <TextUI {...textProps} style={[styles.buttonText, textProps?.style]}>
                                {child}
                            </TextUI>
                        );
                    }
                    return child;
                })
            ) : (
                <TextUI {...textProps} style={[styles.buttonText, textProps?.style]}>
                    {title || 'Button'}
                </TextUI>
            )}

            {rightIcon}
        </TouchableOpacity>
    );
};

export default ButtonUI;

const styles = StyleSheet.create({
    buttonContainer: {
        height: 32,
        // width: 94,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 12,
        backgroundColor: '#F75F',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
    },
});
