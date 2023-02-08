import firestore from '@react-native-firebase/firestore';

const Notifictaions = (Docuser, noticeStatus, tag, type, RequestStatus, noticeID, NoticeName) => {
    // console.log(Docuser, noticeStatus, tag, type, RequestStatus, noticeID, NoticeName);
    try {
        firestore()
            .collection('notification').doc(Docuser).set({
                Notices: firestore.FieldValue.arrayUnion({
                    uid: noticeID,
                    noticeStatus: noticeStatus,
                    status: tag,
                    type: type,
                    userName: NoticeName,
                    requestStatus: RequestStatus,
                    timeStamp: firestore.Timestamp.now(),
                    // createdAt: firestore.FieldValue.serverTimestamp(),
                }),
            }, { merge: true })
            .then(() => {
                console.log('Notices send!');
            });
    }
    catch (e) {
        console.log(e);
    }
}

export default Notifictaions
