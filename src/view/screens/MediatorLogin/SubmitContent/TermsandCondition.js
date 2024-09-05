import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../consts/Colors'
import SimpleHeader from '../../../components/SimpleHeader'

const TermsandCondition = ({navigation}) => {

    const GoBackScreen = () => {
        // setStartDate(null)
        // setEndDate(null)
        // setImageContent(data)
        navigation.goBack()
    }
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
            <SimpleHeader center={'Terms and Conditions'} onpress={() => GoBackScreen()} />



                <View style={{
                    paddingHorizontal:20,
                    paddingTop:20,
                }}>
                    <View style={{
                        paddingVertical:10
                    }}>
                        <Text style={{
                            color:COLORS.black,
                            fontSize:17,
                            fontWeight:'bold'
                        }}>
                            Condition 1
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur. Cursus nisi sem aliquam magna facilisis in eget diam. Nec egestas malesuada nibh ultrices facilisis hendrerit facilisi. Egestas bibendum est arcu ullamcorper massa fringilla. Nec ac diam eleifend luctus est. Quis ac malesuada purus in eget dui in lacus sit. Ipsum tincidunt velit gravida amet elementum ut nunc.
                        </Text>
                    </View>
                </View>

                <View style={{
                    paddingHorizontal:20,
                    paddingTop:20,
                }}>
                    <View style={{
                        paddingVertical:10
                    }}>
                        <Text style={{
                            color:COLORS.black,
                            fontSize:17,
                            fontWeight:'bold'
                        }}>
                            Condition 2
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur. Cursus nisi sem aliquam magna facilisis in eget diam. Nec egestas malesuada nibh ultrices facilisis hendrerit facilisi. Egestas bibendum est arcu ullamcorper massa fringilla. Nec ac diam eleifend luctus est. Quis ac malesuada purus in eget dui in lacus sit. Ipsum tincidunt velit gravida amet elementum ut nunc.
                        </Text>
                    </View>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default TermsandCondition

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.white,
        height:'100%'
    }
})