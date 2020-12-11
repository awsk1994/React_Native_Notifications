import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-Permissions';

export default function App() {
  // Essential to make it work on iOS.
  useEffect(() => {
     Permissions.getAsync(Permissions.NOTIFICATIONS)
     .then((statusObj) => {
       if(statusObj.status !== 'granted'){ // if not granted permission, we want to ask for it.
        return Permissions.askAsync(Permissions.NOTIFICATIONS);
       }
       return statusObj;
     })
     .then((statusObj) => {
       if(statusObj.status !== 'granted'){
         return;  // TODO: Show alert/notification to user.
       }
     })
  }, []) ;

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the first local notification we are setting.'  // You can set more, but not all will be supported. If unsupported, will be ignored.s
      },
      trigger: {  // define when notification should be sent
        seconds: 10
      }
    });  // This creates local notification.
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Notification" onPress={triggerNotificationHandler}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
