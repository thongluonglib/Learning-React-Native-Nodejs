
# Getting Started

## Step 1: Get sentry DNS

### 1. Create a Sentry Project

Go to [sentry.io](sentry.io) click **Project** and **Create Project**

<img width="1430" alt="image" src="https://github.com/user-attachments/assets/3400e28c-534e-4eb8-8b45-a2b06b6e0bf0">

### 2. 

After create setting of project 
<img width="692" alt="image" src="https://github.com/user-attachments/assets/ec3d05dc-b2b5-4c5a-acc6-9b5cb387b917">

3. Click Client Key DNS in left panel and get DNS
   
   <img width="645" alt="image" src="https://github.com/user-attachments/assets/4bb291dd-b5d1-4a1f-9ac9-1ade9b8ff6a4">


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






