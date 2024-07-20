import BackgroundTimer from 'react-native-background-timer';
import { onDisplayNotification } from './Notification';
import { AppRegistry } from 'react-native';


export function startBackgroundTask() {
    // Start a timer that runs once after X milliseconds
    // BackgroundTimer.stopBackgroundTimer();
    // Cancel the timeout if necessary
    BackgroundTimer.runBackgroundTimer(() => {
        console.log("Test")
        // AppRegistry.startHeadlessTask(12, "SomeTaskName", 13)
        // onDisplayNotification();
        //code that will be called every 3 seconds 
    }, 3000);

}
export function stopBackgroundTask() {
    BackgroundTimer.stopBackgroundTimer();
}
