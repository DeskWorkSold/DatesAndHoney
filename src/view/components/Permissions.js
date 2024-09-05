import { PermissionsAndroid } from 'react-native';

export async function requestNotificationPermission() {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
            title: 'Notification Permission',
            message: 'This app needs notification permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
}