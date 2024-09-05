import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { TextProps } from 'react-native';
import { theme } from '@src/theme';
export interface TextUIProps extends TextProps {}
const TextUI = (props: TextUIProps) => {
    const { ...restProps } = props;
    return <Text {...restProps} style={[styles.text, restProps?.style]} />;
};

export default TextUI;

const styles = StyleSheet.create({
    text: {
        color: theme.lightColors?.textPrimary,
        fontFamily: 'Inter 18pt Regular',
    },
});
