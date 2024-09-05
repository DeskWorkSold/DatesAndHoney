import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../consts/Colors'
import { useSelector } from 'react-redux'
import { mediatorLogin, selectMediatorUser } from '../../../../redux/reducers/Reducers'



const MediatorCreateServices = ({ navigation }) => {
    const user = useSelector(selectMediatorUser)
    // console.log(user.POSFood);


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={styles.contentContainer}>

                    <View style={{
                        paddingTop: 40,
                        alignItems: 'center',
                        paddingHorizontal: 50,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black,
                            textAlign: 'center'
                        }}>Services</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingTop: 10
                    }}>
                        {user?.userDetails?.POSFood == 1 ?
                            <Text style={{
                                color: COLORS.black
                            }}>Add your Foods!</Text>
                            :
                            <Text style={{
                                color: COLORS.black
                            }}>Add your Events!</Text>
                        }
                    </View>
                    {user?.userDetails?.POSFood == 1 ?
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('MediatorCreateFoodScreen')}
                            >
                                <View style={{
                                    backgroundColor: COLORS.transparent,
                                    ...styles.NumberInput
                                }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ color: COLORS.black }}>
                                            Create Foods
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('MediatorCreateEventScreen')}
                            >
                                <View style={{
                                    backgroundColor: COLORS.transparent,
                                    ...styles.NumberInput
                                }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ color: COLORS.black }}>
                                            Create Events
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }


                </View>
            </View>
        </SafeAreaView>
    )
}

export default MediatorCreateServices

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        alignItems: 'center',
        height: '85%',
    },
    NumberInput: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        height: 45,
        width: 340,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
    },
})