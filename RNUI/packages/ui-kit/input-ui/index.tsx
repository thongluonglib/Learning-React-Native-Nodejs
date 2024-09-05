import { StyleSheet, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import useDebouncedCallback from '@packages/hooks/use-debounced-callback';
import TextUI, { TextUIProps } from '../text-ui';
export interface InputUIProps extends TextInputProps {
    debouncedDuration?: number;
    containerProps?: ViewProps;
    inputContainerProps?: ViewProps;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    type?: 'search' | '';
    errorMessage?: string;
    errorProps?: TextUIProps;
    label?: string;
    labelProps?: TextUIProps;
}
const InputUI = (props: InputUIProps) => {
    const {
        containerProps,
        inputContainerProps,
        debouncedDuration,
        type,
        leftIcon,
        rightIcon,
        errorMessage,
        errorProps,
        label,
        labelProps,
        ...restProps
    } = props;
    const _onChangeTextDebounce = useDebouncedCallback((text: String) => {
        if (typeof restProps?.onChangeText === 'function') {
            restProps?.onChangeText(text as string);
        }
    }, 500);

    return (
        <View {...containerProps} style={[styles.view, containerProps?.style]}>
            {label && (
                <TextUI {...labelProps} style={[styles.label, labelProps?.style]}>
                    {label}
                </TextUI>
            )}
            <View {...inputContainerProps} style={[styles.container, inputContainerProps?.style]}>
                {leftIcon
                    ? leftIcon
                    : type === 'search' && (
                          <EvilIcons name="search" size={24} style={{ marginRight: 10 }} />
                      )}
                <TextInput
                    placeholder="Tìm kiếm"
                    placeholderTextColor={'#919EAB'}
                    clearButtonMode="while-editing"
                    {...restProps}
                    style={[styles.inputContainer, restProps?.style]}
                    onChangeText={
                        debouncedDuration ? _onChangeTextDebounce : restProps?.onChangeText
                    }
                />
                {rightIcon}
            </View>
            {errorMessage && (
                <TextUI {...errorProps} style={[styles.error, errorProps?.style]}>
                    {errorMessage}
                </TextUI>
            )}
        </View>
    );
};

export default InputUI;

const styles = StyleSheet.create({
    view: {
        // padding: 10,
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        padding: 0,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 10,
        // paddingVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        alignSelf: 'center',
    },
    inputContainer: {
        fontSize: 14,
        flex: 1,
        height: '100%',
    },
    label: { marginHorizontal: 5 },
    error: { marginHorizontal: 5, color: 'rgba(255,51,51, 1)', fontSize: 12 },
});
