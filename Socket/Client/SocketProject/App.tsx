import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import ChatRoom from './src/screens/ChatRoom';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={({ route }) => ({ title: route?.params?.room?.roomName })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;