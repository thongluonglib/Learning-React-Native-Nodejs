
# Uses: 

## At app.tsx add: 

```sh
SentryConfig.init();
```

<img width="1008" alt="image" src="https://github.com/user-attachments/assets/8fa3cd27-eb57-4030-bc39-97370658799d">

## To send message error to sentry

```sh
captureMessage('API Error', "error")
```

***Result:*** 

<img width="1430" alt="image" src="https://github.com/user-attachments/assets/0c213fe9-e094-4549-befe-0c79ebec8e77">

## To track screen performance add 

***1: Goto  utils/SentryConfig.ts set isNavigationTrack: true***

```sh
const defaultConfig = {
    isNavigationTrack: true
}
```
**2. Go to App.tsx and add SentryConfig.registerNavigationContainer(navigation)**

```sh
 <NavigationContainer
      ref={navigation}
      onReady={() => {
        SentryConfig.registerNavigationContainer(navigation) // <-- Add this line
      }}
    >
```

<img width="984" alt="image" src="https://github.com/user-attachments/assets/8d50bb87-2a90-4b5d-9c07-3dbbe67d48c7">

***Result***:

<img height="400" width="1416" alt="image" src="https://github.com/user-attachments/assets/4741fd8e-93ab-45e1-8c55-10fbbd82d795">

<img height="400" width="1425" alt="image" src="https://github.com/user-attachments/assets/d0056b75-9f5b-4cd4-9039-c0ec9bff97f3">

<img height="400" width="1397" alt="image" src="https://github.com/user-attachments/assets/54ad306d-e208-461e-9125-c56f5d536284">

## To track api performance and error at SentryConfig.ts add

```sh
apiTrack: ["localhost", 'http://10.0.2.2:3000'], // <-- Add this line
```

<img width="1156" alt="image" src="https://github.com/user-attachments/assets/09c3c357-9671-4829-8537-898f868cb698">

**result**

<img height="400" width="1419" alt="image" src="https://github.com/user-attachments/assets/82ab3d5b-dfd9-4ac0-a0c9-15580a5edf2c">

## To stop track API has endpoint get-timeout

```sh
shouldCreateSpanForRequest: (url) => {
        // Do not create spans for outgoing requests to a `/health/` endpoint
        return !url.match(/\/get-timeout\/?$/);
    },
```

# Getting Started

<h1>Step 1</h1>

To install the package and setup your project:

```sh
npx @sentry/wizard -s -i reactNative
```
<h1>Step 2</h1> 
Create **.env** and add 

```sh
DNS_SENTRY = 
```

<h1>Step 3</h1>
Create utils/SentryConfig.ts file and add

```sh
import * as Sentry from "@sentry/react-native";
import Config from "react-native-config";
/**
 * apiTrack: ["localhost", "my-site-url.com"]: add api if want to track api
 * shouldCreateSpanForRequest: (url) => {
        // Do not create spans for outgoing requests to a `/health/` endpoint
        return !url.match(/\/get-timeout\/?$/);
    },
 */
const defaultConfig = {
    isNavigationTrack: true,
    routeChangeTimeoutMs: 1000,
    apiTrack: ["localhost", 'http://10.0.2.2:3000'],
    shouldCreateSpanForRequest: null,
}

class SentryConfig {
    static _instance: SentryConfig;
    routingInstrumentation: any;

    public static get instance(): SentryConfig {
        if (!SentryConfig._instance) {
            SentryConfig._instance = new SentryConfig();
        }
        return SentryConfig._instance;
    }

    init() {
        let reactTracingConfig: any = {}
        if (defaultConfig.isNavigationTrack) {
            this.routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
                enableTimeToInitialDisplay: true,
                routeChangeTimeoutMs: defaultConfig.routeChangeTimeoutMs, // default: 1000
            })
            reactTracingConfig.routingInstrumentation = this.routingInstrumentation
        }
        if (defaultConfig.apiTrack?.length > 0) {
            reactTracingConfig.tracePropagationTargets = [...defaultConfig.apiTrack]
            if (defaultConfig?.shouldCreateSpanForRequest) {
                reactTracingConfig.shouldCreateSpanForRequest = defaultConfig.shouldCreateSpanForRequest
            }
        }

        Sentry.init({
            dsn: Config.DNS_SENTRY, //Goto setting project in sentry dashboard to get it
            // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
            // We recommend adjusting this value in production.
            tracesSampleRate: 1.0,
            _experiments: {
                // profilesSampleRate is relative to tracesSampleRate.
                // Here, we'll capture profiles for 100% of transactions.
                profilesSampleRate: 1.0,
            },
            integrations: [new Sentry.ReactNativeTracing(reactTracingConfig)]
        });
    }
    registerNavigationContainer(navigation: any) {
        this.routingInstrumentation.registerNavigationContainer(navigation)
    }
    captureMessage(message: string | "this is a message", type: String | "fatal" | "error" | "warning" | "log" | "info" | "info") {
        console.log('Send message')
        Sentry.captureMessage(message, type);
    }
}

export default SentryConfig.instance

export function captureMessage(message: string | "this is a message", type?: string | "fatal" | "error" | "warning" | "log" | "info" | "info") {
    Sentry.captureMessage(message, type);
}
```

<h1>Step 4: Get sentry DNS</h1>

### 1. Create a Sentry Project

Go to [sentry.io](sentry.io) click **Project** and **Create Project**

<img width="1430" alt="image" src="https://github.com/user-attachments/assets/3400e28c-534e-4eb8-8b45-a2b06b6e0bf0">

### 2. 

then click **setting** icon of project :

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






