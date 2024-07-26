
### List features

#### captureMessage: 
##### uses: Call captureMessage('API Error', "error")
***Result:*** 
<img width="1430" alt="image" src="https://github.com/user-attachments/assets/0c213fe9-e094-4549-befe-0c79ebec8e77">

#### Navigation track screen 
***Step1: goto  utils/SentryConfig.ts set isNavigationTrack: true***
```sh
const defaultConfig = {
    isNavigationTrack: true
}
```
***Step 2: go to App.tsx add SentryConfig.registerNavigationContainer(navigation)***
```sh
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
```
***Result***:
<img width="1416" alt="image" src="https://github.com/user-attachments/assets/4741fd8e-93ab-45e1-8c55-10fbbd82d795">

<img width="1425" alt="image" src="https://github.com/user-attachments/assets/d0056b75-9f5b-4cd4-9039-c0ec9bff97f3">






