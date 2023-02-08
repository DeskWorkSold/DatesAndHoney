import { TextInput, TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';

const RemoveFlakeScreen = () => {
    const [name, setName] = useState();

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>

                <View style={{
                    height: '80%'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        height: 80
                    }}>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/menu.png')} resizeMode='contain'
                                    style={{
                                        height: 45,
                                        color: COLORS.black
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '60%', alignItems: 'center', }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Flakes</Text>
                        </View>

                        <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                        </View>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View>
                            <Text>
                                Remove your flakes for $10 per flakes. Flakes on your profile are added when you cancel date after certain time or do not reach date destination
                            </Text>
                        </View>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 25,
                        paddingVertical: 20,
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.light
                    }}>
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: COLORS.black
                            }}>Flake Meter</Text>
                            <Text>Flakes on your profile</Text>
                        </View>
                        <View>
                            <Image source={require('../../assets/flakemeter.png')} resizeMode='contain' />
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 25,
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            paddingBottom: 5
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Remove Flakes</Text>
                        </View>
                        <View>
                            <Text>No of flakes (max 2)</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.NumberInput}>
                                <TextInput
                                    value={name}
                                    placeholder={'1'}
                                    keyboardType='email-address'
                                    onChangeText={name => setName(name)
                                    }
                                    style={styles.TextInput}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{
                    height: '20%'
                }}>
                    <View style={{
                        paddingTop: 20,
                        alignItems:'center'
                    }}>
                        <CustomeButton onpress={() => navigation.navigate('QuestionWantKidsScreen')}
                            title={'Remove 1 Flake'} />
                    </View>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default RemoveFlakeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    },
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: 45,
        width: 340,
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
})