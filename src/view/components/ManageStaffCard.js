import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { RadioButton } from 'react-native-paper'
const { width, height } = Dimensions.get("window");

const ManageStaffCard = ({ item, index, bgcolor, selectUser, selectedItems, handleRemoval, onSelectUser, onpress, radiobtn }) => {
    return (
        <View
            style={{
                paddingVertical: 20,
                backgroundColor: bgcolor ? bgcolor : COLORS.white,
                width: width,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
            }}>
            <View style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: COLORS.main,
                alignItems: 'center',
            }}>
                <Image source={{ uri: item?.image1 }} resizeMode='cover' style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                }} />
            </View>
            <View style={{
                width: '50%',
                paddingHorizontal: 10,
            }}>
                <View style={{
                    paddingRight: 5,
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: COLORS.black
                    }}>{item?.Name}</Text>
                </View>
                <View
                    style={{
                        marginVertical: 5,
                        paddingVertical: 5,
                        backgroundColor: bgcolor == COLORS?.white ? COLORS?.light : COLORS?.transparent,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 5
                    }}>
                    <Text style={{
                        color: COLORS.black,
                        fontSize: 12,
                        // textAlign: 'center'
                    }}>{item?.MediatorType}
                    </Text>
                </View>
            </View>
            <View style={{
                width: '30%',
                // backgroundColor: COLORS.main,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {radiobtn &&
                    <RadioButton
                        value={selectUser}
                        status={selectedItems?.includes(item) ? 'checked' : 'unchecked'}
                        // {selectedItems.includes(item) ? 
                        // }
                        onPress={() =>
                            selectedItems?.includes(item) ?
                                handleRemoval(index, item)
                                :
                                onSelectUser(index, item)
                        }
                        color={COLORS.black}
                        uncheckedColor={COLORS.black}
                    />
                }
                <TouchableOpacity
                    onPress={() =>
                        selectedItems?.includes(item) ?
                            handleRemoval(index, item)
                            :
                            onSelectUser(index, item)
                    }
                    // onPress={onpress}
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        backgroundColor: COLORS.black,
                        marginRight: 5,
                    }}>
                    <Text style={{
                        color: COLORS.white,
                        fontSize: 12,
                    }}>Give Access</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ManageStaffCard

const styles = StyleSheet.create({})