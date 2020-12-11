import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({  // this is executed for OS to know what to do, before we display to user.
  handleNotification: async () => { // use async function, so we return a promise.
    return {
      shouldShowAlert: true // this will enable notification even though our app is already running.
    };
  }
});

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

  useEffect(() => {
    // Defines what to do when incoming notification is received and APP IS NOT RUNNING.
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // Defines what to do when incoming notification is received and APP IS RUNNING.
    // Set to a variable, so we can turn off notification in the future.
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {  
      console.log(notification)
    });

    // Clean up function, to avoid memory leak.
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    }
  }, []);

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
