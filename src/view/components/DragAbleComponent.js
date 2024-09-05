import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DraggableGrid from 'react-native-draggable-grid';
import { Image } from 'react-native';
import COLORS from '../../consts/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window')
const DragAbleComponent = ({ setData, data, pickImage, removeImage }) => {

    const renderItem = (item, index) => {
        return (
            <View
                style={styles.item}
                key={item.key}
            >
                {item?.uri ? (
                    <View style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 5
                    }}>
                        <TouchableOpacity onPress={() => removeImage(data.indexOf(item))} style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            padding: 5,
                            borderRadius: 50
                        }}>
                            <AntDesign name='close' color={COLORS.white} size={20} />
                        </TouchableOpacity>
                        <Image source={{ uri: item.uri }} style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 5
                        }} />
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => pickImage(data.indexOf(item))} style={styles.item}
                    >
                        <Image source={require('../../assets/add.png')} style={styles.addIcon} />
                        {index === 0 && (
                            <Text style={{
                                fontSize: 10,
                                textAlign:'center',
                                marginHorizontal:10,
                                color: COLORS.gray
                            }}>Click to add profile image</Text>
                        )}
                    </TouchableOpacity>
                )}
                {/* <Text style={styles.item_text}>{item.name}</Text> */}
            </View>
        );
    };

    return (
        <View style={styles.wrapper}>
            <DraggableGrid
                numColumns={3}
                renderItem={(item, index) => renderItem(item, index)}
                data={data}
                onDragRelease={(newData) => {
                    setData(newData); // Need to reset the data order after drag release
                }}
                itemHeight={200}
            />
        </View>
    )
}

export default DragAbleComponent

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 180,
        backgroundColor: 'blue',
    },
    wrapper: {
        // paddingTop: 100,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    item: {
        // flex:1,
        width: width / 3.5,
        // paddingHorizontal:10,
        // marginL:5,
        height: '99%',
        borderRadius: 5,
        backgroundColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_text: {
        fontSize: 14,
        color: '#FFFFFF',
    }
})