import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const SearchTab = ({ search, setSearch, placeholder }) => {
    return (
        <View style={styles.NumberInput}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                backgroundColor: COLORS.light,
                borderTopLeftRadius:10,
                borderBottomLeftRadius:10,
            }}>
                <Image source={require('../../assets/search.png')} resizeMode='contain' style={{
                    marginRight: 5
                }} />
                <TextInput
                    value={search}
                    placeholder={placeholder ? placeholder : 'Type of Company'}
                    onChangeText={search => setSearch(search)
                    }
                    style={styles.TextInput}
                />
            </View>
            <View style={{
                alignItems: 'flex-end',
                backgroundColor: COLORS.main,
                width: '10%',
                height: 45,
                borderTopRightRadius:10,
                borderBottomRightRadius:10,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Image source={require('../../assets/filter.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20,
                }} />
            </View>
        </View>
    )
}

export default SearchTab

const styles = StyleSheet.create({
    NumberInput: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 20,
        // paddingHorizontal: 20,
        // height: 45,
        width: '100%',
        // backgroundColor: COLORS.light,
        // borderRadius: 5,
    },
    TextInput: {
        backgroundColor: COLORS.transparent,
        width: '90%'
    },
})