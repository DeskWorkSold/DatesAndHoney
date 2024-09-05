import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const PaymentTypes = ({ navigation, data, width, value, setValue }) => {
    return (
        <>
            {data?.map((item, index) => (
                <TouchableOpacity key={index}
                    onPress={() => setValue(index)}
                    style={{
                        marginRight: 10,
                        // padding:25,
                        borderWidth: value == index ? 1 : 0,
                        borderColor: COLORS.main,
                        margin: 5,
                        borderRadius: 10,
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        width: width ? width : '30%',
                        paddingVertical: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <View>
                        <Image source={item.img} resizeMode='contain' />
                    </View>
                    <View>
                        <Text style={{
                            color:COLORS.gray
                        }}>
                            {item?.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </>
    )
}

export default PaymentTypes

const styles = StyleSheet.create({})