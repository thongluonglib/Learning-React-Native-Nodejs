Reference: 
[https://dev.to/leon_arantes/react-native-multiple-environments-setup-schemaflavors-3l7p](https://dev.to/leon_arantes/react-native-multiple-environments-setup-schemaflavors-3l7p)
[https://medium.com/@sathishkcontact/managing-multiple-environments-in-react-native-android-ios-scripts-for-different-builds-ea4c5bff6782](https://medium.com/@sathishkcontact/managing-multiple-environments-in-react-native-android-ios-scripts-for-different-builds-ea4c5bff6782)
# Example

## Android
See commit code: [https://github.com/thongluonglib/Learning-React-Native-Nodejs/commit/36c08b0016bd9e89127e832731f4d6adf5b51855](https://github.com/thongluonglib/Learning-React-Native-Nodejs/commit/36c08b0016bd9e89127e832731f4d6adf5b51855)

<img width="339" alt="image" src="https://github.com/user-attachments/assets/0854d550-2710-4f5f-b64b-b63456906029">
<img width="307" alt="image" src="https://github.com/user-attachments/assets/ca040475-0f41-4620-a08f-d72d3fec3fc1">
<img width="318" alt="image" src="https://github.com/user-attachments/assets/780b7f69-6cb3-463d-8010-f16cc45aaa0c">
<img width="338" alt="image" src="https://github.com/user-attachments/assets/7d29bbea-e8c7-40e6-9fa8-274afa50992c">


# Getting Started
Add package.json 
## Step 1: Add script package.json
```sh
"scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "test": "jest",
    "kn": "killall node",
    "adb-r": "adb reverse tcp:8081 tcp:8081",
    "tron": "adb reverse tcp:9090 tcp:9090",
    "resetc": "npm start -- --reset-cache",
    "node:clean": "rm -rf node_modules && npm cache clean && npm install",
    "setDevelopment": "ENVFILE=.env.development",
    "setStaging": "ENVFILE=.env.staging",
    "setProduction": "ENVFILE=.env.production",
    "ios:Pod:Reset": "cd ios && pod deintegrate && pod setup && pod install",
    "ios:clean": "npm run node:clean &&  cd ios && rm -rf ~/Library/Caches/CocoaPods && rm -rf Pods && rm -rf ~/Library/Developer/Xcode/DerivedData/* && yarn ios:Pod:Reset",
    "ios:Pod:install": "cd ios && pod install && cd ..",
    "ios:bundle:assets": "react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios",
    "ios:dev": "npm run setDevelopment && react-native run-ios --mode=Debug --scheme \"development\"",
    "ios:dev-release": "npm run ios:clean && npm run setDevelopment  react-native run-ios --mode=Release --scheme \"development\"",
    "ios:staging": "npm run setStaging && react-native run-ios --mode=Debug --scheme \"staging\"",
    "ios:staging-release": "npm run ios:clean && npm run setStaging  react-native run-ios --mode=Release --scheme \"staging\"",
    "ios:prod": "npm run setProduction && react-native run-ios --mode=Debug --scheme \"production\"",
    "ios:prod-release": "npm run ios:clean && npm run ios:bundle:assets && npm run setProduction  react-native run-ios --mode=Release --scheme \"production\"",
    "android:clean": "npm run node:clean && cd android && ./gradlew clean",
    "android:bundle:assets": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res",
    "android:remove:assets": "rm -rf android/app/src/main/res/drawable-hdpi &&  rm -rf android/app/src/main/res/drawable-mdpi &&  rm -rf android/app/src/main/res/drawable-xhdpi && rm -rf android/app/src/main/res/drawable-xxhdpi && rm -rf android/app/src/main/res/drawable-xxxhdpi && rm -rf android/app/src/main/res/raw",
    "android:dev": "npm run setDevelopment && react-native run-android --mode=developmentDebug --appIdSuffix=development",
    "android:dev-release": "npm run setDevelopment && react-native run-android --mode=developmentRelease--appIdSuffix=development",
    "android:staging": "npm run setStaging && react-native run-android --mode=stagingDebug --appIdSuffix=staging",
    "android:staging-release": "npm run setStaging &&  react-native run-android --mode=stagingRelease --appIdSuffix=staging",
    "android:prod": "npm run setProduction && react-native run-android --mode=productionDebug --appIdSuffix=production",
    "android:prod-release": "npm run setProduction && react-native run-android --mode=productionRelease --appIdSuffix=production",
    "android:DD-apk": "npm run setDevelopment &&  npm run android:clean && npm run android:bundle:assets && npm run android:remove:assets cd android && ./gradlew assembleDevelopmentDebug && killall -9 java",
    "android:DR-apk": "npm run setDevelopment &&  npm run android:clean && npm run android:bundle:assets && npm run android:remove:assets cd android && ./gradlew assembleDevelopmentRelease && killall -9 java",
    "android:SD-apk": "npm run setStaging &&  npm run android:clean && npm run android:bundle:assets && npm run android:remove:assets cd android && ./gradlew assembleStagingDebug && killall -9 java",
    "android:SR-apk": "npm run setStaging &&  npm run android:clean && npm run android:bundle:assets && npm run android:remove:assets cd android && ./gradlew assembleStagingRelease && killall -9 java",
    "android:PD-apk": "npm run setProduction &&  npm run android:clean && npm run android:bundle:assets && npm run android:remove:assets cd android && ./gradlew assembleProductionDebug && killall -9 java",
    "android:PR-apk": "npm run setProduction &&  npm run android:clean && npm run android:bundle:assets && npm run android:remove:assets cd android && ./gradlew assembleProductionRelease && killall -9 java",
    "android:PR-Bundle": "npm run setProduction &&  npm run clean && npm run android:bundle:assets && npm run android:remove:assets && cd android && ./gradlew bundleProductionRelease && killall -9 java",
    "open-apk": "open ./android/app/build/outputs/apk/",
    "open-bundle": "open ./android/app/build/outputs/bundle/productionRelease",
    "android:dev-apk": "npm run android:DD-apk && npm run open-apk",
    "android:dev:release-apk": "npm run android:DR-apk && npm run open-apk",
    "android:staging-apk": "npm run android:SD-apk && npm run open-apk",
    "android:staging:release-apk": "npm run android:SR-apk && npm run open-apk",
    "android:prod-apk": "npm run android:PD-apk && npm run open-apk",
    "android:prod:release-apk": "npm run android:PR-apk && npm run open-apk",
    "android:bundle": "npm run android:PR-Bundle && npm run open-bundle"
  }
```

## Step 2: Create ENV files 

***.env.development***

```bash
   ENV=development
   API_URL=http://localhost:3000
```
***.env.staging***

```bash
   ENV=staging
   API_URL=http://localhost:3000
```

***.env.production***

```bash
   ENV=production
   API_URL=http://localhost:3000
```
## Step 3: Install react-native-config

```bash
   npm install --save react-native-config
```
Add config:
#### Android: android/app/build.gradle add this line at the top of file
```sh
apply from: project(':react-native-config').projectDir.getPath() + '/dotenv.gradle' // <-- Add this line
```
<img width="1363" alt="image" src="https://github.com/user-attachments/assets/6a4fc947-9eb7-4b21-85bc-436e6d211204">


#### iOS: 
```sh
cd ios && pod install
```

## Step 4: Add native config multi-environments

### For Android:

   #### 1. Open ***android/app/build.gradle*** and paste the code as below.
   ```sh
      apply plugin: "com.android.application"

      // add this block
      project.ext.envConfigFiles = [
        development: ".env.development",
        staging :".env.staging",
        production:'.env.production'
      ]
      // ---
   ```
<img width="914" alt="image" src="https://github.com/user-attachments/assets/a749fedf-5b6f-4ba3-9f69-af8a7838c55c">


#### 2. At ***android/app/build.gradle*** add resValue in default config as well. and change and change ***com.multienvapp*** to ***your appid***.

```sh
android {

........

    namespace "com.multienvapp"
    defaultConfig {
        applicationId "com.multienvapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        resValue 'string', 'build_config_package','com.multienvapp' // <-- Add this line
    }

.........
  
}
```

<img width="1300" alt="image" src="https://github.com/user-attachments/assets/4f77a573-53c5-433d-82b3-1a471ca9c581">

#### 3. Create FlavorDimensions and ProductFlavors in ***android>app>build.gradle***. after compileSdk rootProject.ext.compileSdkVersion
```sh
android {
    ndkVersion rootProject.ext.ndkVersion
    compileSdkVersion rootProject.ext.compileSdkVersion

    // add this block
    flavorDimensions 'env'
    productFlavors {
        development {
            dimension 'env'
            applicationIdSuffix ".development"
        }
        staging {
            dimension 'env'
            applicationIdSuffix ".staging"
        }
        production {
            dimension 'env'
            applicationIdSuffix ""
        }
    }
   // ---
...
```
<img width="957" alt="image" src="https://github.com/user-attachments/assets/31ba679d-a540-4fa3-838e-69ca232cea46">

#### Android Change App name and App Icon
##### Option 1. Use resValue - Add resValue resValue 'string', 'app_name', 'MultiApp...' below into productFlavors

```sh
    resValue 'string', 'app_name','MultiAppDev' // <-- Add this line to change App Name
```
```sh
    resValue 'string', 'app_name','MultiAppStaging' // <-- Add this line to change App Name
```
```sh
    resValue 'string', 'app_name','MultiAppProd' // <-- Add this line to change App Name
```
<img width="778" alt="image" src="https://github.com/user-attachments/assets/f06369cb-4a3d-4b86-a087-892531a198b4">

##### Option 2. Just copy the android/app/main folder and rename it to the referring names placed in the flavors in our case we put It development and staging.

***Duplicate main file:***

<img width="384" alt="image" src="https://github.com/user-attachments/assets/6d5849d7-d5d4-4175-a749-a7b0f37f8cb4">

***Rename file to development or staging and remove file java***

<img width="418" alt="image" src="https://github.com/user-attachments/assets/e819bf74-1e2b-440c-bdb2-520f98ed364f">

To change the app icons, just add it inside the specific mipmap of the build development, staging or main(production).

***To change app name, open android/app/src/development/res/values/strings.xml and rename:***
```sh
<resources>
    <string name="app_name">MultiEnvApp Dev</string>
</resources>
````

***To change app name, open android/app/src/staging/res/values/strings.xml and rename:*** 
```sh
<resources>
    <string name="app_name">MultiEnvApp Staging</string>
</resources>
````
<img width="926" alt="image" src="https://github.com/user-attachments/assets/065defc9-a954-475d-baa5-6bb344a606ff">

### For iOS: 

TODO


## Step 5: That's all, we have completed the setting for multiple environment. Now just run App
### Android:
```sh
npm run android:dev
```
##### OR Using Android Studio #####

1. Open Android Studio
2. Select android project
3. Click build choose Select Build Variant
   
   <img width="317" alt="image" src="https://github.com/user-attachments/assets/03beb322-e8af-469b-a175-d95f987c639e">

5. See left panel choose Variant you want to build
   
 <img width="508" alt="image" src="https://github.com/user-attachments/assets/ea757bc5-b4b7-4456-9f93-5cb0bce04ddb">


## Advance 

### Add env versionCode, versionName
#### Android: 
At .env.development, .env.staging, .env.production add 
```sh
ANDROID_VERSION_CODE=1
ANDROID_VERSION_NAME=1.0
```

<img width="780" alt="image" src="https://github.com/user-attachments/assets/7f1704c6-de27-402c-a417-46943e3fd7de">

At ***android/app/build.gradle*** update versionCode, versionName in defaultConfig

```sh
    namespace "com.multienvapp"
    defaultConfig {
        applicationId "com.multienvapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode project.env.get("ANDROID_VERSION_CODE").toInteger() // <--- Add this line to add env versionCode
        versionName project.env.get("ANDROID_VERSION_NAME") // <--- Add this line to add env versionName 
        resValue 'string', 'build_config_package','com.multienvapp' // <-- Add this line
    }
```

#### iOS:
    TODO

## Add env app name 

#### Android: 
    
At .env.development, .env.staging, .env.production add 
```sh
ANROID_APP_NAME=MultiAppDev
```
```sh
ANROID_APP_NAME=MultiAppStaging
```
```sh
ANROID_APP_NAME=MultiAppProduction
```
At ***android/app/build.gradle*** add resValue 'string', 'app_name',project.env.get("ANDROID_APP_NAME") in productFlavors

```sh
flavorDimensions 'env'
    productFlavors {
        development {
            dimension 'env'
            applicationIdSuffix ".development"
            resValue 'string', 'app_name',project.env.get("ANDROID_APP_NAME") // <-- Add this line to change App Name
        }
        staging {
            dimension 'env'
            applicationIdSuffix ".staging"
            resValue 'string', 'app_name',project.env.get("ANDROID_APP_NAME") // <-- Add this line to change App Name
        }
        production {
            dimension 'env'
            applicationIdSuffix ""
            resValue 'string', 'app_name',project.env.get("ANDROID_APP_NAME") // <-- Add this line to change App Name
        }
    }
```

## To Add typescript types for ENV
Just create react-native-config.d.ts at your add declare your env types
```sh
declare module 'react-native-config' {
    export interface NativeConfig {
        ENV: string
        API_URL: string

        ANDROID_VERSION_CODE: string
        ANDROID_VERSION_NAME: string

    }

    export const Config: NativeConfig
    export default Config
}
```
<img width="944" alt="image" src="https://github.com/user-attachments/assets/b5e215c6-b033-40a5-83f7-d21cdac66785">

***Result:***

<img width="1122" alt="image" src="https://github.com/user-attachments/assets/055f4279-6dc4-4c73-b2df-be48e44b84e7">


