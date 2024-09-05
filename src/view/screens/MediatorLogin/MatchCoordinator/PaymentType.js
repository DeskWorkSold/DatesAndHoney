import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors';
import { useState } from 'react';
import CustomeButton from '../../../components/CustomeButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const btns = [
    {
        id: 1,
        name: 'Donation Base only',
        onpress: 'PaymentTypeDetail'
    },
    {
        id: 2,
        name: 'Donations + Monthly rate',
        onpress: 'PaymentTypeDetail'
    }
]

const PaymentType = ({ navigation, route }) => {
    const { title } = route.params
    const [btnindex, setBtnindex] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <View style={{
                    height: height / 1.5,
                }}>
                    <View style={{
                        alignItems: 'center',
                        // backgroundColor:COLORS.gray,
                        height: height / 4,
                        justifyContent: 'flex-end'
                    }}>
                        <Image source={require('../../../../assets/paymenttype.png')} resizeMode='contain' style={
                            {
                                width: width / 1.4
                            }
                        } />
                    </View>
                    <View style={{
                        alignItems: 'center',
                        paddingVertical: 20
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>{title}</Text>
                    </View>
                    {btns.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => [setBtnindex(index), navigation.navigate(item.onpress, { title: item.name })]}
                                    style={[styles.NumberInput, { borderWidth: 1, borderColor: btnindex == index ? COLORS.main : COLORS.transparent }]}
                                >
                                    <View>
                                        <Text style={{ color: COLORS.black, textAlign: 'center' }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}


                </View>
                <View style={{
                    height: height / 0.5,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    paddingVertical: 20,
                }}>
                    <CustomeButton title={'Done'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentType

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        height: height / 1.5,
        // backgroundColor:COLORS.gray
    },
    NumberInput: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 45,
        width: width / 1.2,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        elevation: 4
    },
})