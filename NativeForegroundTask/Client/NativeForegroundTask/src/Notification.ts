import notifee, { EventType } from '@notifee/react-native';

export function registerForegroundService() {
    notifee.registerForegroundService((notification) => {
        return new Promise(() => {
            setInterval(() => {
                console.log("registerForegroundService")
            })
        });
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        console.log("onBackgroundEvent")
    });
    notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
            console.log("Click stop")
        }
    });
}
export async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Foreground Service Notification',
        body: 'Press the Quick Action to stop the service',
        android: {
            channelId,
            actions: [
                {
                    title: 'Stop',
                    pressAction: {
                        id: 'stop',
                    },
                },
            ],
        },
    });
}