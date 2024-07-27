
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
### Android: android/app/build.gradle add this line at the end of file
apply from: project(':react-native-config').projectDir.getPath() + '/dotenv.gradle' // <-- Add this line
### iOS: cd ios && pod install

## Step 3: Add native config multi-environments

#### For Android:
   1. open ***android>app>build.gradle*** and paste the code as below.
   ```sh
      ..........

      project.ext.envConfigFiles = [
              development: ".env.development",
              staging :".env.staging",
              production:'.env.production'
      ]
      .........
   ```
<img width="914" alt="image" src="https://github.com/user-attachments/assets/a749fedf-5b6f-4ba3-9f69-af8a7838c55c">


2. at ***android>app>build.gradle*** and paste the code as below and change and change ***com.multienvapp*** to your app id.

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


