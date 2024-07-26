
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
<img height="400" width="1416" alt="image" src="https://github.com/user-attachments/assets/4741fd8e-93ab-45e1-8c55-10fbbd82d795">

<img height="400" width="1425" alt="image" src="https://github.com/user-attachments/assets/d0056b75-9f5b-4cd4-9039-c0ec9bff97f3">

<img height="400" width="1397" alt="image" src="https://github.com/user-attachments/assets/54ad306d-e208-461e-9125-c56f5d536284">

#### Trace API: utils/SentryConfig.ts 
Add more config to defaultConfig 
 apiTrack: ["localhost", 'http://10.0.2.2:3000'],
shouldCreateSpanForRequest: null,

<img  height="400" width="1408" alt="image" src="https://github.com/user-attachments/assets/711d7dd3-f29c-4b15-9a0e-63a21e72b845">


***apiTrack***: add your api you want to track
***shouldCreateSpanForRequest***: If you don't want trace specific API let add shouldCreateSpanForRequest: 

```sh
shouldCreateSpanForRequest: (url) => {
        // Do not create spans for outgoing requests to a `/health/` endpoint
        return !url.match(/\/get-timeout\/?$/);
    },
```
the example above, the  API has endpoint get-timeout that will not track
<img height="400" width="1419" alt="image" src="https://github.com/user-attachments/assets/82ab3d5b-dfd9-4ac0-a0c9-15580a5edf2c">






