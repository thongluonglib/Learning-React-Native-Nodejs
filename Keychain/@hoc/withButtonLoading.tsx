import {ActivityIndicator} from 'react-native';
import React, {useState} from 'react';

const withButtonLoading = (Component: any) => (props) => {
  const [loading, setLoading] = useState(props?.defaultLoading || false);
  if (loading) {
    return (
      <Component {...props} loading={loading} setLoading={setLoading}>
        <ActivityIndicator />
      </Component>
    );
  }
  return <Component {...props} loading={loading} setLoading={setLoading} />;
};

export default withButtonLoading;
