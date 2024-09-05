import { StyleSheet } from 'react-native';
import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
interface IProps extends FastImageProps {}
const AvatarUI = (props: IProps) => {
    const { ...restProps } = props;
    return <FastImage {...restProps} style={[image, restProps?.style]} />;
};

export default AvatarUI;

const styles = StyleSheet.create({
    image: {},
});
