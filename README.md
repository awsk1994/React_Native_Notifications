React Native Project with Notifications

Section 16 of React Native - The Practical Guide [2020 Edition]

Starting in Video 294.

# Local Notification vs Push Notification:

## Local Notification:
 - Triggered by app, displayed locally to user
 - Never sent to other users or devices
 - Example: Reminder App

## Push Notification:
 - Received by app, displayed locally to user.
 - Push notification usually trigger a local notification.
 - Not triggered by local 
 - Sent remotely to one or many users and devices.
 - Example: chat apps, email app, shopping app

# Steps
1. Video 296: Sending Local Notifications
 - Initialize Expo

 - Install expo-notifications
```
expo install expo-notifications
```

 - Add button
```jsx
<Button title="Trigger Notification" onPress={triggerNotificationHandler}/>
```

 - Import expo-notifications
```jsx
import * as Notifications from 'expo-notifications';
```

 - Create triggerNotificationHandler function
```js
const triggerNotificationHandler = () => {
  Notifications.scheduleNotificationAsync({ // Creates local notification.
    content: {
      title: 'My first local notification',
      body: 'This is the first local notification we are setting.'
    },
    trigger: {  // Define when notification should be sent
      seconds: 10
    }
  });
};
```
   - Notifications.scheduleNotificationAsync creates **local notification**.
   - In the content, you can set many things, but not all will be supported. If unsupported, it will be ignored.
   - Trigger defines **when** the notification should be sent.

 - Modify app.json
```json
"android": {
  "useNextNotificationsApi": true
}
```
   - in app.json, set/add android.useNextNotificationsApi = true

 - Test Run:
<img src="./img/notification-init-screen.png" height="500px"/>
<img src="./img/first-notification.png" height="500px"/>
 - Note that if you click the trigger and stay in the app, you will **NOT** see the notification. You need to leave the app (or go to homescreen) to see the notification.





## 298. Controlling How Notifications Are Displayed

 - As of right now, if we are on App A, and notification is triggered from App A, the notification will not show up. We can configure it so it shows up.

```js
Notifications.setNotificationHandler({  // this is executed for OS to know what to do, before we display to user.
  handleNotification: async () => { // use async function, so we return a promise.
    return {
      shouldShowAlert: true // this will enable notification even though our app is already running.
    };
  }
});
```

TODO: require manual testing


## 299. Reacting to Foreground Notifications

 - When user taps on the notification, we want to bring the user to our app. We will implement this here.


 ```js
export default function App() {
 useEffect(() => {
  // This function(.addNotificationReceivedListener) defines what to do when incoming notification is received and app is running.
  // Set to subscription variable, so we can turn off notification in the future.
  const subscription = Notifications.addNotificationReceivedListener(notification => {  
    console.log(notification)
  });

  // Clean up function, to avoid memory leak.
  return () => {
    subscription.remove();
  }
}, []);
};
```
 - Note that this only works if **app is already running**.

TODO: require manual testing

## 300. Reacting to Background Notifications

 - Now, let's try to make it possible to click on notifications even if **app is closed**.

```js
// Defines what to do when incoming notification is received and APP IS NOT RUNNING.
const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
  console.log(response);
});
```

```js
// Clean up function, to avoid memory leak.
return () => {
  backgroundSubscription.remove();
  foregroundSubscription.remove();
}
```

## 301. How Push Notification Works?

**TODO: For now, we don't need Push Notifications. Will stop here for now.**

## 310. Push Notifications in non-Expo Managed Apps

**TODO: Should figure out how to use expo-notifications in non-expo managed apps.