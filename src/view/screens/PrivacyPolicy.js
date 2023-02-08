import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const PrivacyPolicy = ({navigation}) => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    height: 80
                }}>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
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
                        }}>Privacy Policy</Text>
                    </View>

                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>





                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                }}>
                    <View style={{
                        paddingVertical: 10
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 17,
                            fontWeight: 'bold'
                        }}>
                            How do we gather your data?
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur. Cursus nisi sem aliquam magna facilisis in eget diam. Nec egestas malesuada nibh ultrices facilisis hendrerit facilisi. Egestas bibendum est arcu ullamcorper massa fringilla. Nec ac diam eleifend luctus est. Quis ac malesuada purus in eget dui in lacus sit. Ipsum tincidunt velit gravida amet elementum ut nunc.
                        </Text>
                    </View>
                </View>

                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                }}>
                    <View style={{
                        paddingVertical: 10
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 17,
                            fontWeight: 'bold'
                        }}>
                            How do we use your data?
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

export default PrivacyPolicy

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    }
})
