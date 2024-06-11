import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export async function onAppBootstrap() {
    // Register the device with FCM

    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const FCMtoken = await messaging().getToken();
    console.log('FCMtoken', JSON.stringify(FCMtoken, null, 2))
    await onMessage();
    // Save the token
}

export async function onMessage() {
    messaging().onMessage(async (remoteMessage) => {
        console.log('remoteMessage', JSON.stringify(remoteMessage, null, 2))
        const data: any = remoteMessage.data;
        onDisplayNotification(data?.notifee)
    })
}

async function onDisplayNotification(display: any) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()
    // await requestUserPermission();
    // Create a channel (required for Android)

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
    try {
        var data = JSON.parse(display)
        if (data?.android?.channelId == 'default') {
            data.android.channelId = channelId
        }
        // Display a notification
        await notifee.displayNotification(data)
    }
    catch (error) {
        console.log(error)
    }

    // await notifee.displayNotification({
    //   title: 'Notification Title',
    //   body: 'Main body content of the notification',
    //   android: {
    //     channelId,
    //     // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //       launchActivity: 'com.petproject.MainActivity',
    //     },
    //   },
    //   ios: {
    //     foregroundPresentationOptions: {
    //       badge: true,
    //       sound: true,
    //       banner: true,
    //       list: true,
    //     },
    //   },
    // });
}