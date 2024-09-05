import { Platform, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import React from 'react';

interface IProps extends ViewProps {
    containerProps?: ViewProps;
    type?: 'shadow-overflow' | 'normal';
}

const CardUI = (props: IProps) => {
    const { containerProps, type, ...restProps } = props;
    if (type === 'shadow-overflow') {
        return (
            <View {...containerProps} style={[styles.container, containerProps?.style]}>
                <View {...restProps} style={[styles.card, restProps?.style]} />
            </View>
        );
    }
    return <View {...restProps} style={[styles.cardNormal, restProps?.style]} />;
};

export default CardUI;

const styles = StyleSheet.create({
    container: {
        ...Platform.select<ViewStyle>({
            ios: {
                shadowColor: '#171717',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            // android: {
            //     elevation: 4,
            //     shadowColor: '#171717',
            // },
        }),
    },
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white',
        overflow: 'hidden',
        ...Platform.select<ViewStyle>({
            // ios: {
            //     shadowColor: '#171717',
            //     shadowOffset: { width: 1, height: 1 },
            //     shadowOpacity: 0.2,
            //     shadowRadius: 3,
            // },
            android: {
                elevation: 4,
                shadowColor: '#171717',
            },
        }),
    },
    cardNormal: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        ...Platform.select<ViewStyle>({
            ios: {
                shadowColor: '#171717',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
                shadowColor: '#171717',
            },
        }),
    },
});
