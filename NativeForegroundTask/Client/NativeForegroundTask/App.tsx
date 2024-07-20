// App.js
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { onDisplayNotification } from './src/Notification';
import { AppRegistry } from 'react-native';
const onTask = async (taskData) => {
  // Background Task here
  console.log("taskData: ",  taskData)
  // const data = await fetch('https://hacker-news.firebaseio.com/v0/item/121003.json?print=pretty')
  onDisplayNotification();
};
//SomeTaskName define at NativeForegroundTask/Client/NativeForegroundTask/android/app/src/main/java/com/nativeforegroundtask/MyHeadlessJsTaskService.java
AppRegistry.registerHeadlessTask('SomeTaskName', () =>
  onTask,
);

// if want to call AppRegistry.startHeadlessTask(1,  "SomeTaskName", "Texttt")
const App = () => {
  return (
    <View>
      <Text>Hello</Text>
      <Button title='Notify' onPress={onDisplayNotification} />
    </View>
  );
};

export default App;