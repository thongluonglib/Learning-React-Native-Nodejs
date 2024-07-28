# Reference: 

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
    "ios:dev": "npm run setDevelopment && react-native run-ios --mode=DebugDev --scheme \"development\"",
    "ios:dev-release": "npm run ios:clean && npm run setDevelopment && react-native run-ios --mode=ReleaseDev --scheme \"development\"",
    "ios:staging": "npm run setStaging && react-native run-ios --mode=DebugStaging --scheme \"staging\"",
    "ios:staging-release": "npm run ios:clean && npm run setStaging && react-native run-ios --mode=ReleaseStaging --scheme \"staging\"",
    "ios:prod": "npm run setProduction && react-native run-ios --mode=DebugProduction --scheme \"production\"",
    "ios:prod-release": "npm run ios:clean && npm run ios:bundle:assets && npm run setProduction && react-native run-ios --mode=ReleaseProduction --scheme \"production\"",
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
    
    ANDROID_VERSION_CODE=1
    ANDROID_VERSION_NAME=1.0 

```
***.env.staging***

```bash
    ENV=staging
    API_URL=http://localhost:3000
    
    ANDROID_VERSION_CODE=1
    ANDROID_VERSION_NAME=1.0 
```

***.env.production***

```bash
    ENV=production
    API_URL=http://localhost:3000
    ANDROID_VERSION_CODE=1
    ANDROID_VERSION_NAME=1.0

```

### Add .gitignore file

```sh
.env.development
.env.staging
.env.production
```

<img width="662" alt="image" src="https://github.com/user-attachments/assets/b54f766f-1c2d-4586-91d2-18aeeabc7c55">


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
<h2>That's all done for Android ...!!!</h2>

### For IOS:
<h2>First Create Multi App Name</h2>

#### 1. Open Info.plist add Bundle display name = $(PRODUCT_NAME)

<img width="883" alt="image" src="https://github.com/user-attachments/assets/a53a30e6-f635-404d-9c02-76f6ad0fefa4">

#### 2. Go to the PROJECT>Your App>Info>configurations and click + add like bellow

<img width="1137" alt="image" src="https://github.com/user-attachments/assets/3aacd9aa-6882-4d50-ba0b-215c90af43b6">

#### 3. Go to TARGETS>Your App>Build Settings>Search "product name" and click + add like bellow
Note: You can change it
    **MultiEnvApp Dev** is your development app_name
    **MultiEnvApp Staging** is your staging app_name
    **MultiEnvApp** is your production app_name

<img width="1128" alt="image" src="https://github.com/user-attachments/assets/b4e4bb06-4b78-4342-b9b4-7338be8a2213">

#### 4. Then continue searching "identifier" and change your bundle like bellow has suffix .dev, .staging, and keep production as ""

<img width="1133" alt="image" src="https://github.com/user-attachments/assets/a4378516-cf30-4dda-ab90-23a8607c370d">

#### 5. Go to Product>Schemes>ManageSchemes edit your current scheme MultiEnvApp to development and click + to add staging, production schemes

<img width="1304" alt="image" src="https://github.com/user-attachments/assets/48555091-74d8-48b6-91ef-6476a77ba39d">


<img width="1218" alt="image" src="https://github.com/user-attachments/assets/5996a9cc-fbac-499b-a402-695d0182ccb4">

#### 6. Then go to Product>Schemes>EditScheme edit and change Build Configuration for:
**Run, Test, Profile, Analyze, Archive** like bellow:

##### Development

<img width="889" alt="image" src="https://github.com/user-attachments/assets/447b9831-f9ff-4b6b-be82-b2959953cb4a">

<img width="915" alt="image" src="https://github.com/user-attachments/assets/b203f40c-83c3-4fbb-b2df-51de3401c46a">

<br />

##### Staging

<img width="915" alt="image" src="https://github.com/user-attachments/assets/83751936-e0b7-4998-a71c-6b1009946bee">

##### Production

<img width="919" alt="image" src="https://github.com/user-attachments/assets/06f792db-b98e-44f7-91d7-2d61b02d852b">

#### 7. Add bellow to Podfile: 
```sh
project 'MultiEnvApp', {
  'DebugDev' => :debug,
  'DebugStaging' => :debug,
  'DebugProduction' => :debug,
  'ReleaseDev' => :release,
  'ReleaseStaging' => :release,
  'ReleaseProduction' => :release,
}
```
<img width="875" alt="image" src="https://github.com/user-attachments/assets/96104ad4-9087-4752-aa2d-a95def2fedc8">
<h2>Second config .env.development, .env.staging, .env.production</h2>

#### 1. Add ios/tmp.xcconfig to .gitignore file (Important)
```sh
ios/tmp.xcconfig
```
<img width="887" alt="image" src="https://github.com/user-attachments/assets/8028e7dc-4dae-4e9b-ae45-9cc861644405">

#### 2. Go to PodFile and add 

```sh
pod 'react-native-config/Extension', :path => '../node_modules/react-native-config' # <-- Add this line
```

<img width="1201" alt="image" src="https://github.com/user-attachments/assets/f5538c63-8951-4008-ba62-1a4ee2269b11">

### 3. Go to Product>Schemes>EditScheme choose Build>Pre-actions and click + add like bellow:

<h2>development</h2>

```sh
rm "${CONFIGURATION_BUILD_DIR}/${INFOPLIST_PATH}"
echo ".env.development" > /tmp/envfile
```

```sh
"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"
```

<img width="919" alt="image" src="https://github.com/user-attachments/assets/e8c72fb2-9c32-46e6-a8dc-1d9b1b6c9314">

<h2>staging</h2>


```sh
rm "${CONFIGURATION_BUILD_DIR}/${INFOPLIST_PATH}"
echo ".env.staging" > /tmp/envfile
```

```sh
"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"
```

<img width="929" alt="image" src="https://github.com/user-attachments/assets/2d8d3022-f802-4ea3-9c80-8c13fabca4b0">

<h2>prodution</h2>


```sh
rm "${CONFIGURATION_BUILD_DIR}/${INFOPLIST_PATH}"
echo ".env.production" > /tmp/envfile
```

```sh
"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"
```

<img width="922" alt="image" src="https://github.com/user-attachments/assets/8b826581-ba10-4b2e-9b33-574d73e426c0">

<h2>That's all done for IOS ...!!!</h2>

## Step 5: That's all, we have completed the setting for multiple environment. Now just run App

<h2>Android</h2>

**Run Android App**

```sh
npm run android:dev
```

**Run Android App using Android Studio**

1. Open Android Studio
2. Select Android project
3. Click build choose Select Build Variant
   
   <img width="317" alt="image" src="https://github.com/user-attachments/assets/03beb322-e8af-469b-a175-d95f987c639e">

5. See the left panel and choose Variant you want to build
   
 <img width="508" alt="image" src="https://github.com/user-attachments/assets/ea757bc5-b4b7-4456-9f93-5cb0bce04ddb">

<h2>IOS</h2>

**Run IOS App**

```sh
npm run ios:dev
```

**Run IOS App with specific device**

```sh
npm run ios:dev -- --simulator="iPhone 15"
```

**Run IOS App using xcode**

1. Open X code
2. Choose your environment want to build

<img width="1203" alt="image" src="https://github.com/user-attachments/assets/144df1a6-4211-49d3-8315-e24ef3bc745c">

3. Click build


<h1>Happy end we have completed set multiple environment and app name for Android and IOS</h1>


# Advanced

### To change versionCode, versionName in .env.* files
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

## To change app_name in .env.* files

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

## To declare typescript types for ENV
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


