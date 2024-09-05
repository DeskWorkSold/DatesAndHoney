import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import SVGImg from '../../assets/splashlogo.svg';
import SVGImg1 from '../../assets/menu.svg';
import SVGImg2 from '../../assets/menu2.svg';

const HeaderTabOne = ({ Lefticon, logo, onpress, onpress2, Righticon, Title, RighticonTextColor }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 70,
        }}>
            <View style={{
                flex: 1, alignItems: "flex-start", paddingHorizontal: 5,
                // backgroundColor: COLORS.gray,
            }}>
                <TouchableOpacity onPress={onpress}>
                    {Lefticon ?
                        <SVGImg1 width={46} height={46} />
                        :
                        <Image source={require('../../assets/menu3.png')} resizeMode='contain' />
                    }
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2, alignItems: 'center' }}>
                {logo ?
                    <SVGImg width={83} height={59} />
                    :
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black,
                        fontFamily: 'Roboto-Medium'
                    }}>
                        {Title}
                    </Text>
                }
            </View>

            <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={onpress2 ? onpress2 : null}>
                    {typeof Righticon == 'string' ?
                        <Text style={{
                            fontSize: 14,
                            color: RighticonTextColor ? RighticonTextColor : COLORS.gray,
                        }}>{Righticon}</Text>
                        :
                        Righticon ?
                            <SVGImg2 width={50} height={49} />
                            :
                            null}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderTabOne