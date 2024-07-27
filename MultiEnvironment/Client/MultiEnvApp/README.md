
# Getting Started

## Step 1: Create ENV files 

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
## Step 2: Install react-native-config

```bash
   npm install --save react-native-config
```
Add config:
#### Android: android/app/build.gradle add this line at the end of file
```sh
apply from: project(':react-native-config').projectDir.getPath() + '/dotenv.gradle' // <-- Add this line
```
<img width="893" alt="image" src="https://github.com/user-attachments/assets/f9e691eb-e1a8-4cd3-bebd-a9bba9a1c376">

#### iOS: cd ios && pod install

## Step 3: Add native config multi-environments

#### For Android:

   1. Open ***android/app/build.gradle*** and paste the code as below.
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


2. At ***android/app/build.gradle*** add resValue in default config as well. and change and change ***com.multienvapp*** to ***your appid***.

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

3. Create FlavorDimensions and ProductFlavors in ***android>app>build.gradle***. after compileSdk rootProject.ext.compileSdkVersion
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

##### Android Change App name and App Icon
Just copy the android/app/main folder and rename it to the referring names placed in the flavors in our case we put it
development and staging.
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

#### For iOS: 



## Step 4: Add script package.json
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
