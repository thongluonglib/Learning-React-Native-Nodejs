# Reference

[https://www.browserstack.com/guide/detox-testing-tutorial](https://www.browserstack.com/guide/detox-testing-tutorial)

[https://blog.logrocket.com/react-native-end-to-end-testing-detox/](https://blog.logrocket.com/react-native-end-to-end-testing-detox/)

## Demo

<img width="852" alt="image" src="https://github.com/user-attachments/assets/92776163-d2b0-4b21-8e6f-5c02f264e043">

https://github.com/user-attachments/assets/0957139e-22e0-4030-bab0-7bd9b334aec2


# Getting Started

## 1. You’ll also need Node or above and Apple Simulator Utilities.
You can use the following commands to install them:

Run brew update && brew install node to update Homebrew and install Node.
Run brew tap wix/brew && brew install applesimutils to install Apple Simulator Utilities.

```sh
brew update && brew install node
```

```sh
brew tap wix/brew && brew install applesimutils
```

## 2. Install the Detox CLI by running the following command:

```sh
npm install -g detox-cli
```

## 3. Install Detox in your project:
Go to your project path and run npm install detox –save-dev to install Detox as a development dependency in your project.

```sh
npm install detox –save-dev
```

## 4. Configure Detox in your project:

1. At your project add **.detoxrc.js** file 
2. Then add code bellow to **.detoxrc.js** file  
3. Then find **RNDetoxTest** in **.detoxrc.js** file and change become **your project name**
4. Then change your Android and ios device to use the test
   With config bellow I use **iPhone 15** to test ios and **Pixel_4_API_34** to test android 

Click the **(... icon)** on Emulator to get the android name

<img width="821" alt="image" src="https://github.com/user-attachments/assets/827805d1-14f2-4915-b2fc-ae65af88bed9">

<img width="696" alt="image" src="https://github.com/user-attachments/assets/1bcc393c-34db-4a67-aa55-d77beb17e7e5">

<img width="1037" alt="image" src="https://github.com/user-attachments/assets/028ef65c-ea0e-4e4f-9683-9e2684363d33">


```sh
/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/RNDetoxTest.app',
      build: 'xcodebuild -workspace ios/RNDetoxTest.xcworkspace -scheme RNDetoxTest -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/RNDetoxTest.app',
      build: 'xcodebuild -workspace ios/RNDetoxTest.xcworkspace -scheme RNDetoxTest -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15' // <--- Change your ios device name here 
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4_API_34' // <--- Change your android device name here 
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};


```

## 5. Create e2e folder and add 

<img width="370" alt="image" src="https://github.com/user-attachments/assets/bec28ead-6112-42ba-a46d-18462dc434b5">

**1. app.test.js**

```sh
describe('Example', () => {
    // previous tests here
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });
    
    it('should enable swiping back and forth', async () => {
        await expect(element(by.text('Step One'))).toBeVisible();
        await element(by.id('slides')).swipe('left');
        await element(by.id('slides')).swipe('right');
        await expect(element(by.text('Step One'))).toBeVisible();
    });

    it('should render "Debug" and have a Button to click in the third slide', async () => {
        await element(by.id('slides')).swipe('left');
        await element(by.id('slides')).swipe('left');
        await expect(element(by.text('Debug'))).toBeVisible();

        await element(by.text('Click here!')).tap();
        await expect(element(by.text('Clicked!'))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it('should render "Learn More" and change text in the fourth slide', async () => {
        await element(by.id('slides')).swipe('left');
        await element(by.id('slides')).swipe('left');
        await element(by.id('slides')).swipe('left');
        await expect(element(by.text('Learn More'))).toBeVisible();

        const docsInput = element(by.id('docsInput'));

        await expect(docsInput).toBeVisible();

        await docsInput.clearText();
        await docsInput.typeText('Maybe later!');

        await expect(docsInput).toHaveText('Maybe later!');
    });
});
```

**2. jest.config.js**

```sh
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
```

**3. starter.test.js**

```sh
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have step-one screen', async () => {
    await expect(element(by.id('step-one'))).toBeVisible();
  });
});
````

## 6. Add Package.json

Add to **package.json**

```sh
"android:clean": "cd android && ./gradlew clean && cd ..",
"e2e:build-ios-debug": "detox build -c ios.sim.debug",
"e2e:build-ios-release": "detox build -c ios.sim.release",
"e2e:test-ios-debug": "detox test -c ios.sim.debug",
"e2e:test-ios-release": "detox test -c ios.sim.release",
"e2e:build-android-debug": "yarn android:clean && detox build -c android.emu.debug",
"e2e:build-android-release": "yarn android:clean && detox build -c android.emu.release",
"e2e:test-android-debug": "detox test -c android.emu.debug",
"e2e:test-android-release": "detox test -c android.emu.release"
```

## 7. How to use detox

After you finished config detox below

## For IOS

First run **e2e:build-ios-debug** to build for debug, just **one time**
```sh
npm run e2e:build-ios-debug
```

Second run **e2e:test-ios-debug** to start test for debug

```sh
npm run e2e:test-ios-debug
```

## For Android

First run **e2e:build-android-debug** to build for debug, just **one time**

```sh
npm run e2e:build-android-debug
```

Second run **e2e:test-android-debug** to test for debug

```sh
npm run e2e:test-android-debug
```


