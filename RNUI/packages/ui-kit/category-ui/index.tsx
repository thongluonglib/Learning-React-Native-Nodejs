import { Image, ImageProps, StyleSheet, Text, View, ViewProps } from 'react-native';
import React from 'react';
import TextUI, { TextUIProps } from '../text-ui';
interface ICategoryUI extends ImageProps {
    containerProps?: ViewProps;
    imageContainerProps?: ViewProps;
    textProps?: TextUIProps;
    text?: string;
}
const CategoryUI = (props: ICategoryUI) => {
    const { containerProps, imageContainerProps, text, textProps, ...restProps } = props;
    return (
        <View {...containerProps} style={[styles.container, containerProps?.style]}>
            <View
                {...imageContainerProps}
                style={[styles.imageContainer, imageContainerProps?.style]}
            >
                <Image resizeMode="cover" {...restProps} style={[styles.icon, restProps?.style]} />
            </View>
            <TextUI {...textProps} style={[styles.text, restProps?.style]}>
                {text || 'Nổi bật'}
            </TextUI>
        </View>
    );
};

export default CategoryUI;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        backgroundColor: 'rgba(238, 242, 255, 0.6)',
        borderColor: 'rgba(204, 220, 255, 0.83)',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
    },
    icon: {
        width: 20,
        height: 20,
        aspectRatio: 1,
    },
    text: {
        fontSize: 12,
    },
});
