import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export const SendPushNotifyMatch =async (matchuser, Currentuser, mymsg) => {
    console.log(matchuser, Currentuser, mymsg);
    // return
    await firestore()
        .collection('token')
        .doc(matchuser?.uid)
        .get()
        .then(doc => {
            let token = doc?.data()?.token;
            console.log(token ,'r==========');

            // return
            if (token) {
                var data = JSON.stringify({
                    notification: {
                        title: 'It’s a Match!',
                        body: `${Currentuser?.Name ? Currentuser.Name : 'Someone'} swiped right on you! ${mymsg ? mymsg : 'Open the app to see your match and start chatting!'}`,
                    },
                    to: token,
                });
                let config = {
                    method: 'post',
                    url: 'https://fcm.googleapis.com/fcm/send',
                    headers: {
                        Authorization:
                            'key=AAAAjKV_1r4:APA91bH56x6Wf4dGGgy4pBN1FN2UBCanBAk3WPaW3gMU2sba7_Ou1xnAKL6i_bbcZx9LhShUrc_GTwkhnU-MRCWwOCvwi-Gj6Nj4eC_-8WWj8giBSCWkqfcb0H7BpcQgyC1X3lRyzGt4',
                        'Content-Type': 'application/json',
                    },
                    data: data,
                };
                axios(config)
                    .then(res => {
                        console.log('Push notification sent:', res.data);
                    })
                    .catch(error => {
                        console.log('Error sending push notification:', error);
                    });
            }
        });
}