import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import COLORS from '../../consts/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import HeaderTabOne from './HeaderTabOne';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const GiftedChatScreen = ({ userImg }) => {
    // const userName = route.params.userName;
    // const userImg = route.params.userImg;
    // const id = route.params.id;
    // console.log('userName: ', userName);
    // console.log('userName: ', userImg);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: userImg,
                },
            },

            {
                _id: 2,
                text: 'Hello world',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: userImg,
                },
            },

        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name='angle-double-down' size={22} color='#333'/>
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.main
                    },
                    left: {
                        backgroundColor: COLORS.mainlight
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.black
                    }
                }}
            />
        );
    }
    const renderSend = (props) => {
        return (
            <View style={{ flexDirection: 'row', alignItems:'center',
            marginRight:5,
            marginTop:5 }}>
                <Send {...props}>
                    <View>
                        <Icon name='send' size={32} color={COLORS.black} />
                    </View>
                </Send>
                <View style={{paddingHorizontal:3}}>
                    <Image source={require('../../assets/attechment.png')} resizeMode="contain"
                    style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.black
                    }} />
                </View>
                <View style={{paddingHorizontal:3}}>
                    <Image source={require('../../assets/camera.png')} resizeMode="contain"
                    style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.black
                    }} />
                </View>
                <View style={{paddingHorizontal:3}}>
                    <Image source={require('../../assets/voice.png')} resizeMode="contain"
                    style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.black
                    }} />
                </View>
            </View>
        )
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    )
}

export default GiftedChatScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
    }
})