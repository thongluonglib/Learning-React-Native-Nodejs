import {
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  ViewProps,
  TextProps,
  TouchableNativeFeedbackProps,
} from 'react-native';
import React, {Component, useCallback} from 'react';
import withButtonLoading from '../../@hoc/withButtonLoading';

interface IProps {
  loading: boolean | undefined;
  setLoading(arg0: boolean): void;
  children?: any;
  color?: String | '#fa0';
  viewProps?: ViewProps;
  textProps?: TextProps;
  buttonProps?: TouchableNativeFeedbackProps;
  title: String | 'Press';
}

function ButtonFeedBack(props: IProps) {
  const onPress = useCallback(() => {
    if (typeof props.setLoading === 'function') {
      props.buttonProps.onPress(props.setLoading);
    }
  }, [])
  return (
    <View style={styles.container} {...props.viewProps}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(props.color)}
        {...props.buttonProps}
        disabled={props.loading}
        onPress={onPress}>
        <View style={styles.touchable}>
          {props.children ? (
            props.children
          ) : (
            <Text style={styles.text} {...props.textProps}>
              {props.title}
            </Text>
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
ButtonFeedBack.defaultProps = {
  color: '#fa0',
  title: 'Press',
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
  },
  touchable: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  text: {alignSelf: 'center'},
});

export default withButtonLoading(ButtonFeedBack);
