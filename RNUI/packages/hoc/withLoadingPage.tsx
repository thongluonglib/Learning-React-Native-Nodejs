import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const withLoadingPage = (Component: any) => (props: any) => {
  const [loading, setLoading] = useState(props?.defaultLoading || false);
  if (loading) {
    return (
      <View style={styles.viewLoading}>
        <ActivityIndicator />
      </View>
    );
  }
  return <Component {...props} loading={loading} setLoading={setLoading} />;
};

export default withLoadingPage;

const styles = StyleSheet.create({
  viewLoading: {
    flex: 1,
    backgroundColor: '#fa4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
