import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { selectChatuser } from '../../../redux/reducers/Reducers'
import { useSelector } from 'react-redux'

const Masseges = [
    {
        id: '1',
        userName: 'Srto h.',
        userImg: require('../../assets/like1.png'),
        messageText: 'having a good day?'
    },
    {
        id: '2',
        userName: 'Laite I',
        userImg: require('../../assets/like2.png'),
        messageText: 'Ok i am coming'
    },
    {
        id: '3',
        userName: 'Swertw',
        userImg: require('../../assets/profile3.png'),
        messageText: 'Typing...'
    },
    {
        id: '4',
        userName: 'Srto h.',
        userImg: require('../../assets/profile2.png'),
        messageText: 'having a good day back?'
    },
]

const MessageScreen = ({ navigation }) => {
    const reduxChatUser = useSelector(selectChatuser);
    console.log(reduxChatUser);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    padding: 10,
                    paddingTop: 20,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>Matching With You! 
                    {reduxChatUser ? (
                        <Text style={{ fontWeight: '400', fontSize: 13 }}>({reduxChatUser.length})</Text>
                    ):(
                        <Text style={{ fontWeight: '400', fontSize: 13 }}>(0)</Text>
                    )}
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.light,
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            padding: 20,
                            width: 65,
                            height: 65,
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 60,
                        }}>
                            {reduxChatUser ? (
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: COLORS.black,
                                    textAlign:'center'
                                }}>+{reduxChatUser.length}</Text>
                            ):(
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: COLORS.black,
                                    textAlign:'center'
                                }}>+0</Text>
                            )}
                        </View>
                        <Text>Matches</Text>
                    </View>

                    {reduxChatUser && (
                        <FlatList
                            data={reduxChatUser}
                            keyExtractor={(item, index) => String(index)}
                            // keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        marginHorizontal: 10,
                                        backgroundColor: COLORS.main,
                                        borderRadius: 50,
                                    }}>
                                        <Image source={{ uri: item.image1 }} resizeMode='cover'
                                            style={{
                                                width: 65,
                                                height: 65,
                                                borderRadius: 50,
                                            }} />
                                    </View>
                                    <Text>{item.Name.split(' ')[0]}...</Text>
                                </View>
                            )} />
                    )}
                    {/* <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like1.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Srto h.</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like2.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Laite I</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like3.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Swertw</Text>
                    </View> */}
                </View>


                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.white
                }}>
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 17
                        }}>
                            Messages
                        </Text>
                    </View>

                    {reduxChatUser ? (
                        <FlatList
                            data={reduxChatUser}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item }) => (
                                <ScrollView vertical showsVerticalScrollIndicator={false}>
                                    <View>
                                        <TouchableOpacity onPress={
                                            () => navigation.navigate('ChatingScreen', {
                                            userName: item.Name,
                                            userImg: item.image1,
                                            uid: item.uid,
                                        })
                                        // () => console.log(item.Name , item.image1 , item.uid)
                                    }
                                        >
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                borderBottomWidth: 1,
                                                borderBottomColor: COLORS.light,
                                                height: 100,
                                            }}>
                                                <View style={{
                                                    marginHorizontal: 10,
                                                    borderRadius: 50,
                                                    width: '20%',
                                                }}>
                                                    <Image source={{ uri: item.image1 }} resizeMode='contain'
                                                        style={{
                                                            width: 65,
                                                            height: 65,
                                                            borderRadius: 50,
                                                        }} />
                                                </View>

                                                <View style={{
                                                    width: '65%'
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: COLORS.black
                                                    }}>{item.Name}</Text>
                                                    <Text>say hey...</Text>
                                                </View>
                                                <View style={{
                                                    width: '15%'
                                                }}>
                                                    <Image source={require('../../assets/star.png')} resizeMode="contain"
                                                        style={{
                                                            tintColor: COLORS.gray
                                                        }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            )}
                        />
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light,
                            height: 100,
                        }}>
                            <View style={{
                                marginHorizontal: 10,
                                borderRadius: 50,
                                width: '20%',
                            }}>
                                <Image source={require('../../assets/nouser.png')} resizeMode='contain'
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 30,
                                        tintColor: COLORS.gray
                                    }} />
                            </View>

                            <View style={{
                                width: '65%'
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>No user!</Text>
                                <Text>match not found to chat..</Text>
                            </View>

                            <View style={{
                                width: '15%'
                            }}>
                                <Image source={require('../../assets/star.png')} resizeMode="contain"
                                    style={{
                                        tintColor: COLORS.gray
                                    }} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
        backgroundColor: COLORS.white,
        height: '100%'
    }
})