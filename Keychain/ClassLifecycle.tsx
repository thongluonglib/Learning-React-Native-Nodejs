import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import ButtonFeedBack from './@components/Button/ButtonFeedback';

export default class ClassLifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('---getDerivedStateFromProps', nextProps);
    if (nextProps.someValue !== prevState.someValue) {
      return {someState: nextProps.someValue};
    } else {
      return null;
    }
  }
  componentDidMount(): void {
    console.log('----componentDidMount');
  }
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    console.log('----componentDidUpdate', JSON.stringify(prevProps, null, 2));
  }
  getSnapshotBeforeUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>) {
    console.log(
      '----getSnapshotBeforeUpdate',
      JSON.stringify(prevProps, null, 2),
    );
    return;
  }
  shouldComponentUpdate(
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any,
  ): boolean {
    console.log(
      '----shouldComponentUpdate',
      JSON.stringify(nextProps, null, 2),
    );
    return true;
  }
  render() {
    console.log('-----render', JSON.stringify(this.state.count, null, 2));
    return (
      <View>
        <Text>ClassLifecycle: {this.state.count}</Text>
        <ButtonFeedBack
          title="Press"
          buttonProps={{
            onPress: () => {
              this.setState({
                count: this.state.count + 1,
              });
            },
          }}
        />
      </View>
    );
  }
}
