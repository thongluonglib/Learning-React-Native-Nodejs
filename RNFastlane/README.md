[https://medium.com/@mdifasulthon/complete-guide-for-publish-react-native-app-to-firebase-using-fastlane-android-and-ios-865c74280d6e](https://medium.com/@mdifasulthon/complete-guide-for-publish-react-native-app-to-firebase-using-fastlane-android-and-ios-865c74280d6e)

# Getting started

<h2>Prepare</h2>

```sh
brew install ruby
brew install fastlane
```

### 1. Add package.json 

```sh
"android:release-firebase-beta": "bundle exec fastlane android distribute",
"ios:release-firebase-beta": "bundle exec fastlane ios distribute"
```
<img width="727" alt="image" src="https://github.com/user-attachments/assets/35545588-7e06-4880-a34b-ec0c9d9708bf">

### 2. Create release android
Go to android/app

```sh
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 3. Add config release

Go to android/app/build.gradle

```sh
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

Go to **android/gradle.properties**

MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****


<h2>Step 1: Create fastlane</h2>

### 1. Create folder fastlane

<img width="443" alt="image" src="https://github.com/user-attachments/assets/03eb081b-4654-4a2e-af00-7b6c7900b751">

### 2. Add Fastfile in fastlane folder

<img width="1278" alt="image" src="https://github.com/user-attachments/assets/824fb498-bd5e-4845-8e16-21c650a374a5">


```sh
fastlane_require 'dotenv'

before_all do
  Dotenv.overload('.env')
end

desc 'Android: Increment versionCode and set versionName to package.json version.'
private_lane :inc_ver_and do
    # package = load_json(json_path: "./package.json")

    increment_version_code(
        gradle_file_path: "./android/app/build.gradle",
    )

    increment_version_name(
        gradle_file_path: "./android/app/build.gradle",
        version_name: package['version']
    )
end

# desc 'iOS: Increment build number and set the version to package.json version.'
# private_lane :inc_ver_ios do
#     package = load_json(json_path: "./package.json")

#     increment_build_number(
#         xcodeproj: './ios/' + package['name'] + '.xcodeproj'
#     )

#     increment_version_number(
#         xcodeproj: './ios/' + package['name'] + '.xcodeproj',
#         version_number: package['version']
#     )
# end

# desc 'iOS Archive'
# lane :ios_build do
#     package = load_json(json_path: "./package.json") 
#     scheme = package['name'] 

#     get_certificates
#     get_provisioning_profile( 
#         adhoc: true,
#         force: true,
#         filename: "provisioning.mobileprovision"
#     )
#     update_project_provisioning(
#       xcodeproj: './ios/' + scheme + '.xcodeproj',
#       target_filter: scheme,
#       profile: "./provisioning.mobileprovision",
#       build_configuration: "Release"
#     )
#     build_app(
#         scheme: scheme,
#         workspace: "./ios/"+scheme+".xcworkspace",
#         export_method: "ad-hoc"
#     )
# end

# platform :ios do
#   desc "Release ios app beta version"
#   lane :distribute do
#       inc_ver_ios

#       ios_build

#       release = firebase_app_distribution(
#           app: ENV["APP_ID"],
#           groups: {Your group name, ex: "Groups"},
#           firebase_cli_token: ENV["FIREBASE_TOKEN"],
#           release_notes: "Release New Feature",
#           debug: true
#       )
#   end
# end

platform :android do
  desc "Release android app beta version"
  increment_version_code(gradle_file_path: "./android/app/build.gradle")
  lane :distribute do
    gradle(task: 'clean assembleRelease', project_dir: './android', print_command: false, properties: {
      "MYAPP_UPLOAD_STORE_FILE" => ENV["MYAPP_UPLOAD_STORE_FILE"],
      "MYAPP_UPLOAD_STORE_PASSWORD" => ENV["MYAPP_UPLOAD_STORE_PASSWORD"],
      "MYAPP_UPLOAD_KEY_ALIAS" => ENV["MYAPP_UPLOAD_KEY_ALIAS"],
      "MYAPP_UPLOAD_KEY_PASSWORD" => ENV["MYAPP_UPLOAD_KEY_PASSWORD"]
    })

    firebase_app_distribution(
      app: ENV["FIREBASE_APP_ID"],
      firebase_cli_token: ENV["FIREBASE_TOKEN"],
      release_notes: "Release new feature",
      debug: true
    )
  end
end
```

### 3. Add .env in fastlane folder
<img width="849" alt="image" src="https://github.com/user-attachments/assets/05895834-219f-4bb3-b2b8-5a7a0cff5d1b">


```sh
MYAPP_UPLOAD_STORE_FILE=release.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=123
MYAPP_UPLOAD_KEY_PASSWORD=123
FIREBASE_TOKEN=
FIREBASE_APP_ID=
```

### 4. At RNFastlane's project run 

```sh
fastlane add_plugin fastlane-plugin-increment_version_code increment_version_name increment_version_code fastlane-plugin-increment_version_name 
```
```sh
bundle install
```
<img width="989" alt="image" src="https://github.com/user-attachments/assets/6bac2539-95b4-49fc-bc68-c635c39c2de6">

<h2>Step 2: Setup Firebase Android Distribute and get FIREBASE_TOKEN, FIREBASE_APP_ID</h2>

### 1. Create firebase project

Go to [https://console.firebase.google.com/](https://console.firebase.google.com/) and **Create a Project**

<img width="296" alt="image" src="https://github.com/user-attachments/assets/9e92c3d9-1014-4a3e-87c2-83e689085924">

### 2. Create android in the project 

<img width="1164" alt="image" src="https://github.com/user-attachments/assets/d871b0eb-9365-447c-bd45-a81df06eba88">

### 3. Add google-service.json

  Download and placed the **google-service.json** file on **android/app**
  
  <img width="390" alt="image" src="https://github.com/user-attachments/assets/be8c0a0f-0586-437f-a8cc-fc9ec2f96622">
  
### 4. Modify yourandroid/app/build.gradle

```sh
apply plugin: "com.google.gms.google-services"
```

<img width="461" alt="image" src="https://github.com/user-attachments/assets/bdfd180b-03e5-4d4e-92c6-543dfb2a055f">

### 5. Modify your android/build.gradle

```sh
buildscript {
  ...
  dependencies {
    ...
    classpath("com.google.gms:google-services:4.3.15")
  }
}
```

<img width="587" alt="image" src="https://github.com/user-attachments/assets/470d5b17-0f99-481c-9321-272afca5756b">

### 6. To get FIREBASE_APP_ID

Goto [https://console.firebase.google.com/](https://console.firebase.google.com/) choose **Project Settings** and get FIREBASE_APP_ID is **App ID**

<img width="710" alt="image" src="https://github.com/user-attachments/assets/3325c5cb-5b44-41bd-8de0-9f5484731a16">


### 7. To get FIREBASE_TOKEN 
Open **terminal** and run: 
<img width="229" alt="image" src="https://github.com/user-attachments/assets/e1df0b54-cfa8-4131-839f-339943712a00">

```sh
firebase login
```

After login see FIREBASE_TOKEN is the token in **terminal**

<h2>Step 3: Run fastlane</h2>

### At fastlane folder level run 

```sh
gem install bundler
```
```sh
bundler install
```

### Finished Now we will build android app

```sh
npm run android:release-firebase-beta
```

<img width="1353" alt="image" src="https://github.com/user-attachments/assets/6a05a78f-004d-4f27-9072-86e7989502ec">










