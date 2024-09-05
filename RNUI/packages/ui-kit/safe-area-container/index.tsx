import { View, ViewProps, ViewStyle } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface IProps extends ViewProps {
    edges?: {
        top?: boolean;
        left?: boolean;
        right?: boolean;
        bottom?: boolean;
    };
}
const SafeAreaContainer = (props: IProps) => {
    const {
        edges = {
            top: true,
            left: true,
            right: true,
            bottom: false,
        },
        ...restProps
    } = props;
    const insets = useSafeAreaInsets();

    const styles: ViewStyle = {
        flex: 1,
        backgroundColor: '#FFFFFF',
    };
    if (edges?.top) {
        styles.paddingTop = insets.top;
    }
    if (edges?.bottom) {
        styles.paddingBottom = insets.bottom;
    }
    if (edges?.right) {
        styles.paddingRight = insets.right;
    }
    if (edges?.left) {
        styles.paddingLeft = insets.left;
    }

    return <View {...restProps} style={[styles, restProps.style]} />;
};

export default SafeAreaContainer;
