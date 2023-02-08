import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const HeaderTabOne = ({ Lefticon, logo, onpress, Righticon, Title }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 70
        }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={onpress}>
                    <Image source={Lefticon} resizeMode='contain' style={{
                        width:20,
                        height:20,
                    }} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2, alignItems: 'center' }}>
                {logo ? 
                <Image source={logo} resizeMode='contain'
                    style={{
                        height: 50
                    }} />
                :
                <Text style={{
                    fontSize:20,
                    fontWeight:'bold',
                    color:COLORS.black,
                    fontFamily:'Roboto-Medium'
                }}>
                    {Title}
                </Text>
                }
            </View>

            <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 20 }}>
                {Righticon ?
                    <TouchableOpacity>
                        <Image source={Righticon} resizeMode='contain' />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <Image source={require('../../assets/menu2.png')} resizeMode='contain' />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default HeaderTabOne