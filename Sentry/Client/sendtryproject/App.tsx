import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import DetailPage from './src/screens/DetailPage';
import SentryConfig from './src/utils/SentryConfig';

const Stack = createNativeStackNavigator();
SentryConfig.init();
function App() {
  const navigation: any = React.useRef();
  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        SentryConfig.registerNavigationContainer(navigation)
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;