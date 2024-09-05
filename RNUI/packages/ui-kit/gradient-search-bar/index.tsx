import { StyleSheet, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import React from 'react';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import useDebouncedCallback from '@packages/hooks/use-debounced-callback';
interface IProps extends TextInputProps {
    linearGradientProps?: LinearGradientProps;
    inputContainerProps?: ViewProps;
    debouncedDuration?: number;
    containerBorderWidth?: number;
}
const GradientSearchBar = (props: IProps) => {
    const {
        debouncedDuration,
        inputContainerProps,
        containerBorderWidth = 1,
        linearGradientProps = {
            colors: ['#0050FF', '#2DC0FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF'],
            start: { x: 0, y: 1 },
            end: { x: 1, y: 1 },
        },
        ...restProps
    } = props;

    const _onChangeTextDebounce = useDebouncedCallback((text: String) => {
        if (typeof restProps.onChangeText == 'function') restProps?.onChangeText(text as string);
    }, 500);

    return (
        <LinearGradient
            {...linearGradientProps}
            style={[styles.gradient, linearGradientProps?.style]}
        >
            <View
                {...inputContainerProps}
                style={[
                    styles.viewContainer,
                    { margin: containerBorderWidth },
                    inputContainerProps?.style,
                ]}
            >
                <EvilIcons name="search" size={24} style={{ marginRight: 10 }} />
                <TextInput
                    placeholder="Tìm kiếm"
                    placeholderTextColor={'#919EAB'}
                    onChangeText={
                        debouncedDuration ? _onChangeTextDebounce : restProps.onChangeText
                    }
                    clearButtonMode="while-editing"
                    {...restProps}
                    style={[styles.inputContainer, restProps.style]}
                />
            </View>
        </LinearGradient>
    );
};

export default GradientSearchBar;

const styles = StyleSheet.create({
    gradient: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        margin: 10,
    },
    viewContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        margin: 1,
        flexDirection: 'row',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        alignSelf: 'center',
    },
    inputContainer: {
        fontSize: 14,
        flex: 1,
        height: 34,
    },
});
