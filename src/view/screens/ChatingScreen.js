import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import HeaderTabOne from '../components/HeaderTabOne';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';
import Notifictaions from '../components/Notifictaions';
import { IconButton, MD3Colors } from 'react-native-paper';



const ChatingScreen = ({ navigation, route }) => {
    // console.log('==>' , route.params);
    const userName = route.params.userName;
    const userImg = route.params.userImg;
    const uid = route.params.uid;
    const [messages, setMessages] = useState([]);
    const Currentuser = useSelector(selectUser);


    // console.log('userName: ', userName);
    // console.log('userName: ', userImg);

    const [showhide, setShowHide] = useState(false)
    const [sendchat, setSendChat] = useState('')

    const SwitchMode = (value) => (
        setShowHide(value)
    );

    useEffect(() => {
        // getAllMessages()
        const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid
        // console.log(docid);
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
        messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {
                // console.log('date: ', docSanp.data());
                const data = docSanp.data();
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate(),
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        // user: {
                        //     avatar: userImg,
                        // },
                    }
                }
            })
            setMessages(allmsg)
            // console.log('==>',allmsg.user);
        })
    }, [])

    const onSend = useCallback((messages = []) => {
        const msg = messages[0]
        const mymsg = {
            ...msg,
            sentBy: Currentuser.uid,
            sentTo: uid,
            createdAt: new Date()
        }
        // console.log(mymsg);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log('==>', uid);
        const docid = uid > Currentuser.uid ? Currentuser.uid + "-" + uid : uid + "-" + Currentuser.uid
        // console.log('final', docid);
        // return;
        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.main,
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.white
                    }
                }}
            />
        )
    }

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderTopColor: "#E8E8E8",
                    borderTopWidth: 1,
                    padding: 2
                }}
            />
        );
    };

    const renderSend = props => {
        return (
            <Send {...props}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <IconButton
                        icon='send-circle'
                        size={30}
                        iconColor={COLORS.main}
                    />
                </View>
            </Send>
        )
    }
    const goToMessages = () => {
        navigation.goBack()
        uid
        // console.log('goback');
    }

    function scrollToBottomComponent() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <IconButton icon='chevron-double-down' size={36} iconColor={COLORS.main} />
            </View>
        );
    }
    function renderLoading() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size='large' color={COLORS.main} />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    height: '10%',
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={goToMessages} style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                style={{
                                    tintColor: COLORS.black
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={{ uri: userImg }} resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>{userName}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        {/* <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/call.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </View> */}
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/moreoption.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.black
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingTop: 20,
                    backgroundColor: COLORS.white,
                }}>
                    <TouchableOpacity onPress={value => setShowHide(value)} style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.main,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{
                            color: COLORS.main,
                            fontSize: 16,
                        }}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowHide(true)} style={{
                        width: '50%',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.gray2,
                        alignItems: 'center',
                        marginHorizontal: 5,
                        paddingBottom: 5
                    }}>
                        <Text style={{
                            color: COLORS.gray2,
                            fontSize: 16,
                        }}>Date Mode</Text>
                    </TouchableOpacity>
                </View>

                {showhide == true ? (
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        backgroundColor: COLORS.white,
                        marginTop: 30,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        elevation: 3,
                    }}>
                        <View style={{
                            alignItems: 'center',
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Date mode</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{ textAlign: 'center' }}>Text your trusted friend or family member a link to
                                your live Location During date mode</Text>
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DateModeScreen')}
                                style={{
                                    marginVertical: 10,
                                    backgroundColor: COLORS.main,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    width: '50%',
                                }}>
                                <Text style={{ color: COLORS.black }}>Request tracking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.white,
                    }}>
                        <GiftedChat
                            messages={messages}
                            onSend={messages => onSend(messages)}
                            user={{
                                _id: Currentuser.uid,
                                avatar: Currentuser.image1,
                            }}
                            renderBubble={renderBubble}
                            alwaysShowSend
                            renderInputToolbar={props => customtInputToolbar(props)}
                            renderSend={props => renderSend(props)}
                            // renderInputToolbar={renderInputToolbar}
                            scrollToBottomComponent={scrollToBottomComponent}
                            renderLoading={renderLoading}

                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default ChatingScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
        flex: 1,
    },
    container2: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        flex: 1,
        height: 400,
    },
    footer: {
        height: 120,
        width: '100%'
    },
    inputType: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: COLORS.gray2,
        height: 40
    }
})
